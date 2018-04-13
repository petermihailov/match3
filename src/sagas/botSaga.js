import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import {put, call, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {startGame, sumRemoved, sumPoints} from './gameSaga'
import {getGame} from './selectors'

const DELAY = 1000;

export default function* gameWithBotSaga() {
  yield takeLatest(types.game.START_GAME_WITH_BOT, startGameWithBot);
  yield takeEvery(types.game.BOT_START_MOVE, botStartMove)
}

function* startGameWithBot() {
  yield put(actions.game.initGameWithBot());
  yield call(startGame);
}

function* botStartMove() {
  const {grid} = yield select(getGame);
  const moves = m3.getMoves(grid);
  const bestMove = getGoodMove(grid, moves);

  yield delay(DELAY);
  yield put(actions.grid.move(bestMove.coords))
}

function getGoodMove(grid, moves) {
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

  return analyzedMoves.sort((a, b) => a.points < b.points ? 1 : -1)[0];
}