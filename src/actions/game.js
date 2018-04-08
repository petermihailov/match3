import {makeAction} from './../utils'

export const types = {
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_MOVER: 'SET_MOVER',
  SET_SCORE: 'SET_SCORE',
  SET_TIMER: 'SET_TIMER',
  MISS_MOVE: 'MISS_MOVE',
  RESET_MISSED_MOVES: 'RESET_MISSED_MOVES',
};

const actions = ({
  startGame: makeAction(types.START_GAME),
  resetGame: makeAction(types.RESET_GAME),
  setMover: makeAction(types.SET_MOVER),
  setScore: makeAction(types.SET_SCORE),
  setTimer: makeAction(types.SET_TIMER),
  missMove: makeAction(types.MISS_MOVE),
  resetMissedMoves: makeAction(types.RESET_MISSED_MOVES),
});

export default actions;