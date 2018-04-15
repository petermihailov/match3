import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import animations from './../animations'
import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {NotificationManager} from './../components/notifications';
import {delay} from 'redux-saga'
import {getGame} from './selectors'

const DELAY = 200;
const MOVE_TIME = 30000;
const SCORE_TO_WIN = 15000;
const MISSED_MOVES_TO_LOOSE = 2;

const stubLevel = [
  [{type: 3}, {type: 1}, {type: 2}, {type: 4}, {type: 5}, {type: 4}],
  [{type: 1}, {type: 1}, {type: 1}, {type: 1}, {type: 5}, {type: 4}],
  [{type: 2}, {type: 2}, {type: 2}, {type: 2}, {type: 1}, {type: 1}],
  [{type: 3}, {type: 2}, {type: 1}, {type: 3}, {type: 1}, {type: 1}],
  [{type: 4}, {type: 4}, {type: 4}, {type: 4}, {type: 1}, {type: 1}],
  [{type: 5}, {type: 5}, {type: 5}, {type: 5}, {type: 1}, {type: 1}]
];

export default function* gameSaga() {
  yield takeLatest(types.game.START_GAME, startGameWithPlayer);
  yield takeEvery(types.grid.MOVE, move);
  yield takeEvery(types.game.MISS_MOVE, endMove);
}

export function* startGameWithPlayer() {
  yield put(actions.game.setGameWithBot(false));
  yield call(startGame);
}

export function* startGame() {
  yield put(actions.game.resetGame());
  yield put(actions.grid.createLevel());
  yield put(actions.game.setMover(Math.random() >= 0.5 ? 'left' : 'right'));
  yield put(actions.grid.lock(false));
  yield call(startMove);
}

function* endGame(message) {
  yield put(actions.grid.lock(true));
  yield put(actions.game.setMover(null));
  yield put(actions.game.setTimer(null));
  NotificationManager.info(message, '🎉 Победа! 🎉', 5000);
}

function* checkWinner() {
  const {players} = yield select(getGame);

  const pointsWinnerMover = Object.keys(players).find((player) => players[player].score >= SCORE_TO_WIN);
  const pointsWinner = pointsWinnerMover && players[pointsWinnerMover];

  const technicalLooserMover = Object.keys(players).find((player) => players[player].missedMoves >= MISSED_MOVES_TO_LOOSE);
  const technicalWinner = technicalLooserMover && players[technicalLooserMover === 'left' ? 'right' : 'left'];

  return pointsWinner || technicalWinner;
}

function* move(action) {
  yield put(actions.grid.lock(true));

  const {rows, cols} = yield select(getGame);
  const {from, to} = action.payload;

  if (to.row < rows && to.col < cols) {
    yield call(swap, {from, to});

    const {grid} = yield select(getGame);
    const matches = m3.getMatches(grid);

    if (matches.length > 0) {
      yield put(actions.game.setTimer(null));
      yield call(findAndRemoveMatches, matches);
      yield put(actions.game.resetMissedMoves());
      yield call(endMove);
    } else {
      yield call(swap, {from: to, to: from});
      yield put(actions.grid.lock(false));
    }
  } else {
    yield put(actions.grid.lock(false));
  }
}

function* startMove() {
  const {withBot, mover} = yield select(getGame);

  yield put(actions.game.setTimer(new Date().getTime() + MOVE_TIME));
  if (withBot && mover === "right") {
    yield put(actions.game.botStartMove());
  } else {
    yield put(actions.grid.lock(false));
  }
}

function* endMove() {
  yield put(actions.game.setTimer(null));

  const winner = yield checkWinner();
  if (winner) {
    yield call(endGame, `Игрок ${winner.name} победил!`);
    return;
  }

  const {grid} = yield select(getGame);
  if (m3.getMoves(grid).length === 0) {
    NotificationManager.info('Нет ходов');
    yield put(actions.grid.createLevel());
  }

  yield call(switchMover);
  yield call(startMove);
}

function* swap({from, to}) {
  yield call(animations.grid.swap, {from, to});
  yield put(actions.grid.swap({from, to}));
}

function* removeMatches(matches) {
  yield call(animations.grid.removeMatches, matches);
  yield put(actions.grid.removeMatches(matches));
}

function* applyGravity() {
  const {grid} = yield select(getGame);

  yield call(animations.grid.applyGravity, grid);
  yield put(actions.grid.applyGravity());
}

function* fillVoid() {
  const {grid, types} = yield select(getGame);
  const changes = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        changes.push({row, col, piece: {type: Math.floor(Math.random() * types) + 1}});
      }
    }
  }

  yield put(actions.grid.fillVoid(changes));
  yield call(animations.grid.fillVoid, changes);
}

function* findAndRemoveMatches(matches, acc = []) {
  if (matches.length > 0) {
    if (matches.find((m) => m.length > 4)) {
      NotificationManager.info('Дополнительный ход!', '5 в ряд!');
      yield put(actions.game.setAdditionalMove());
    }

    acc.push(...matches);

    yield call(removeMatches, matches);
    yield call(applyGravity);
    yield call(fillVoid);
    yield delay(DELAY);

    const {grid} = yield select(getGame);
    yield call(findAndRemoveMatches, m3.getMatches(grid), acc);
  } else {
    yield call(addPoints, sumPoints(sumRemoved(acc)));
  }
}

function* addPoints(points) {
  const {mover, players} = yield select(getGame);
  const oldScore = players[mover].score;
  const score = oldScore + points;

  yield put(actions.game.setScore({mover, score}));
}

function* switchMover() {
  const {mover, players} = yield select(getGame);

  if (players[mover].additionalMove) {
    yield put(actions.game.resetAdditionalMove());
  } else {
    yield put(actions.game.setMover(mover === 'left' ? 'right' : 'left'));
  }
}

export function sumRemoved(matches) {
  return matches.reduce((acc, match) => {
    if (!acc.hasOwnProperty(match.type)) {
      acc[match.type] = 0;
    }

    acc[match.type] += match.length;

    return acc;
  }, {})
}

export function sumPoints(removed) {
  return Object.keys(removed).reduce((acc, type) => acc += type * 100 * removed[type], 0);
}