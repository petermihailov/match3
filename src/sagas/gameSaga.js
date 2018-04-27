import * as m3 from 'm3lib';
import {push} from 'react-router-redux';
import {delay} from 'redux-saga';
import actions, {types} from '../actions';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {NotificationManager} from './../components/notifications';
import {getGame, getSettings} from './selectors';
import dict from './../dict';

const MOVE_TIME = 30000;
const MISSED_MOVES_TO_LOOSE = 2;

export default function* gameSaga() {
  yield takeLatest(types.game.START_GAME, startGameWithPlayer);
  yield takeLatest(types.game.RESTART_GAME, startGame);
}

export function* startGameWithPlayer() {
  yield put(actions.game.setGameWithBot(false));
  yield put(push('game'));
  yield call(startGame);

  ga('send', {
    hitType: 'event',
    eventCategory: 'game',
    eventAction: 'startGameWithPlayer',
    eventLabel: 'Start game with Player'
  });
}

export function* startGame() {
  yield put(actions.game.resetGame());
  yield put(actions.grid.createLevel());
  yield put(actions.game.setMover(Math.random() >= 0.5 ? 'left' : 'right'));
  yield call(startMove);
}

export function* endGame(message, title) {
  yield put(actions.game.endGame());
  yield put(actions.grid.lock(true));
  yield put(actions.game.setMover(null));
  NotificationManager.info(message, title, 3500);
  yield delay(3000);
}

function* startMove() {
  const {withBot, mover} = yield select(getGame);

  if (withBot && mover === "right") {
    yield put(actions.game.botStartMove());
  } else {
    yield put(actions.grid.lock(false));
  }

  yield put(actions.game.setTimer(Date.now() + MOVE_TIME));
}

export function* endMove(points) {
  if (typeof points === 'number') {
    yield call(addPoints, points);

    if (points > 9999) {
      const {lang} = yield select(getSettings);
      const message = dict[lang].gameMessages.goodMove;
      NotificationManager.info(message.message, message.title, 1800);
    }
  }

  yield put(actions.game.setTimer(null));
  yield call(checkPossibleMoves);
  yield call(switchMover);
}

function* switchMover() {
  if (yield call(checkWinner)) return;

  const {mover, players} = yield select(getGame);

  if (players[mover].additionalMove) {
    yield put(actions.game.resetAdditionalMove());
  } else {
    const nextMover = mover === 'left' ? 'right' : 'left';
    yield put(actions.game.setMover(nextMover));
  }

  yield call(startMove);
}

function* checkWinner() {
  const {players} = yield select(getGame);
  const {scoreToWin, lang} = yield select(getSettings);

  const pointsWinnerMover = Object.keys(players).find((player) => players[player].score >= scoreToWin);
  const pointsWinner = pointsWinnerMover && players[pointsWinnerMover];
  const technicalLooserMover = Object.keys(players).find((player) => players[player].missedMoves >= MISSED_MOVES_TO_LOOSE);
  const technicalWinner = technicalLooserMover && players[technicalLooserMover === 'left' ? 'right' : 'left'];
  const winner = pointsWinner || technicalWinner;

  if (winner) {
    yield call(endGame, dict[lang].gameMessages.win.message(winner.name), dict[lang].gameMessages.win.title);
    return winner;
  }
}

function* checkPossibleMoves() {
  const {grid} = yield select(getGame);
  const {lang} = yield select(getSettings);

  if (m3.getMoves(grid).length === 0) {
    NotificationManager.info(dict[lang].gameMessages.noMoves);
    yield put(actions.grid.createLevel());
  }
}

function* addPoints(points) {
  const {mover, players} = yield select(getGame);
  const oldScore = players[mover].score;
  const score = oldScore + points;

  yield put(actions.game.setScore({mover, score}));
}
