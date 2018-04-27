import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {startGame} from './gameSaga'
import {sumRemoved, sumPoints} from './moveSaga'
import {getGame} from './selectors'
import {push} from 'react-router-redux';

const DELAY = 1000;

export default function* gameWithBotSaga() {
  yield takeLatest(types.game.START_GAME_WITH_BOT, startGameWithBot);
  yield takeLatest(types.game.BOT_START_MOVE, botStartMove)
}

function* startGameWithBot() {
  yield put(actions.game.setGameWithBot(true));
  yield put(push('game'));
  yield call(startGame);

  ga('send', {
    hitType: 'event',
    eventCategory: 'game',
    eventAction: 'startGameWithBot',
    eventLabel: 'Start game with Bot'
  });
}

function* botStartMove() {
  const {grid, botDifficulty} = yield select(getGame);
  const moves = m3.getMoves(grid);
  const bestMove = getMove(grid, moves, botDifficulty);

  yield delay(DELAY);
  yield put(actions.grid.move(bestMove.coords))
}

function getMove(grid, moves, botDifficulty) {
  const analyzedMoves = moves.map((move) => {
    let removedMatches = [];
    let newGrid = m3.swap(grid, move);
    let matches = m3.getMatches(newGrid);

    while (matches.length > 0) {
      removedMatches = removedMatches.concat(matches);
      newGrid = m3.removeMatches(newGrid, matches);
      newGrid = m3.applyGravity(newGrid);
      matches = m3.getMatches(newGrid);
    }

    return ({coords: move, points: sumPoints(sumRemoved(removedMatches))});
  });

  if (botDifficulty === 0) {
    return analyzedMoves[Math.floor(Math.random() * analyzedMoves.length)];
  }

  if (botDifficulty === 1) {
    return analyzedMoves.sort((a, b) => a.points < b.points ? 1 : -1)[0];
  }
}