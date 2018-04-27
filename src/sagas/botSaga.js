import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import {put, call, takeLatest, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {startGame} from './gameSaga'
import {sumRemoved, sumPoints} from './moveSaga'
import {getGame, getSettings} from './selectors'
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
  const {grid} = yield select(getGame);
  const {botDifficulty} = yield select(getSettings);
  const moves = m3.getMoves(grid);
  const bestMove = getMove(grid, moves, botDifficulty);

  yield delay(DELAY);
  yield put(actions.grid.move(bestMove.coords))
}

function getMove(grid, moves, botDifficulty) {
  const checkDeep = (deep) => {
    if (botDifficulty === 0) {
      return deep < 1
    } else {
      return true;
    }
  };

  const analyzedMoves = moves.map((move) => {
    let removedMatches = [];
    let newGrid = m3.swap(grid, move);
    let matches = m3.getMatches(newGrid);
    let removedPieces = 0;
    let deepInc = 0;
    let haveAdditionalMove = false;

    while (checkDeep(deepInc) && matches.length > 0) {
      haveAdditionalMove = !haveAdditionalMove
        ? Boolean(matches.find((match) => match.length > 4))
        : haveAdditionalMove;
      removedMatches = removedMatches.concat(matches);
      removedPieces += matches.reduce((sum, match) => sum + match.length, 0);
      newGrid = m3.removeMatches(newGrid, matches);
      newGrid = m3.applyGravity(newGrid);
      matches = m3.getMatches(newGrid);
      deepInc++;
    }

    return ({
      coords: move,
      points: sumPoints(sumRemoved(removedMatches)),
      deep: deepInc,
      removedPieces,
      haveAdditionalMove
    });
  });

  return analyzedMoves.sort((a, b) => {
    if (a.haveAdditionalMove && !b.haveAdditionalMove) {
      return -1;
    } else if (!a.haveAdditionalMove && b.haveAdditionalMove) {
      return 1;
    }

    return a.points < b.points ? 1 : -1
  })[0];
}
