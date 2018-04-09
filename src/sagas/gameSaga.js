import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import animations from './../animations/grid'
import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {getGame} from './selectors'

const DELAY = 200;
const MOVE_TIME = 30000;
const SCORE_TO_WIN = 10000;
const MISSED_MOVES_TO_LOOSE = 2;

export default function* gameSaga() {
  yield takeEvery(types.grid.MOVE, move);
  yield takeLatest(types.game.START_GAME, startGame);
  yield takeEvery(types.game.MISS_MOVE, endMove);
}

function* startGame() {
  yield put(actions.game.resetGame());
  yield put(actions.grid.createLevel());
  yield put(actions.game.setMover(Math.random() >= 0.5 ? 'left' : 'right'));
  yield put(actions.grid.lock(false));
  yield startMove();
}

function* endGame(message) {
  yield put(actions.grid.lock(true));
  yield put(actions.game.setMover(null));
  yield put(actions.game.setTimer(null));

  const restart = confirm(message);

  if (restart) {
    yield put(actions.game.resetGame());
    yield startGame();
  }
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
  const {gridNode, from, to} = action.payload;

  yield call(swap, {gridNode, from, to});

  const {grid} = yield select(getGame);
  const matches = m3.getMatches(grid);

  if (matches.length > 0) {
    yield put(actions.game.setTimer(null));
    yield call(findAndRemoveMatches, matches);
    yield put(actions.game.resetMissedMoves());
    yield endMove();
  } else {
    yield call(swap, {gridNode, from: to, to: from});
    yield put(actions.grid.lock(false));
  }
}

function* startMove() {
  yield put(actions.game.setTimer(new Date().getTime() + MOVE_TIME));
  yield put(actions.grid.lock(false));
}

function* endMove() {
  yield put(actions.game.setTimer(null));

  const winner = yield checkWinner();
  if (winner) {
    yield endGame(`Player ${winner.name} win! 🎉\nRestart?`);
    return;
  }

  const {grid} = yield select(getGame);
  if (m3.getMoves(grid).length === 0) {
    alert('not moves, regenerating field');
    yield put(actions.grid.createLevel());
  }

  yield switchMover();
  yield startMove();
}

function* swap({gridNode, from, to}) {
  yield call(animations.swap, {gridNode, from, to});
  yield put(actions.grid.swap({from, to}));
}

function* removeMatches(matches) {
  yield put(actions.grid.removeMatches( matches));
}

function* applyGravity() {
  yield put(actions.grid.applyGravity());
}

function* fillVoid() {
  yield put(actions.grid.fillVoid());
}

function* findAndRemoveMatches(matches, acc = []) {
  if (matches.length > 0) {
    acc.push(...matches);
    yield call(removeMatches, matches);
    yield delay(DELAY);
    yield call(applyGravity);
    yield delay(DELAY);
    yield call(fillVoid);
    yield delay(DELAY);

    const {grid} = yield select(getGame);
    yield call(findAndRemoveMatches, m3.getMatches(grid), acc);
  } else {
    yield addPoints(sumPoints(sumRemoved(acc)));
  }
}

function* addPoints(points) {
  const {mover, players} = yield select(getGame);
  const score = players[mover].score + points;

  yield put(actions.game.setScore({mover, score}));
}

function* switchMover() {
  const {mover} = yield select(getGame);
  yield put(actions.game.setMover(mover === 'left' ? 'right' : 'left'));
}

function sumRemoved(matches) {
  return matches.reduce((acc, match) => {
    if (!acc.hasOwnProperty(match.type)) {
      acc[match.type] = 0;
    }

    acc[match.type] += match.length;
    return acc;
  }, {})
}

function sumPoints(removed) {
  return Object.keys(removed).reduce((acc, type) => acc += type * 100 * removed[type], 0);
}