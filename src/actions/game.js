import {makeAction} from './../utils'

export const types = {
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME',
  RESTART_GAME: 'RESTART_GAME',
  START_GAME_WITH_BOT: 'START_GAME_WITH_BOT',
  SET_GAME_WITH_BOT: 'SET_GAME_WITH_BOT',
  BOT_START_MOVE: 'BOT_START_MOVE',
  SET_BOT_DEFFICULTY: 'SET_BOT_DEFFICULTY',
  RESET_GAME: 'RESET_GAME',
  SET_MOVER: 'SET_MOVER',
  SET_SCORE: 'SET_SCORE',
  SET_TIMER: 'SET_TIMER',
  MISS_MOVE: 'MISS_MOVE',
  RESET_MISSED_MOVES: 'RESET_MISSED_MOVES',
  SET_ADDITIONAL_MOVE: 'SET_ADDITIONAL_MOVE',
  RESET_ADDITIONAL_MOVE: 'RESET_ADDITIONAL_MOVE',
  SET_SCORE_TO_WIN: 'SET_SCORE_TO_WIN',
};

const actions = ({
  startGame: makeAction(types.START_GAME),
  endGame: makeAction(types.END_GAME),
  restartGame: makeAction(types.RESTART_GAME),
  setGameWithBot: makeAction(types.SET_GAME_WITH_BOT),
  startGameWithBot: makeAction(types.START_GAME_WITH_BOT),
  botStartMove: makeAction(types.BOT_START_MOVE),
  setBotDifficulty: makeAction(types.SET_BOT_DEFFICULTY),
  resetGame: makeAction(types.RESET_GAME),
  setMover: makeAction(types.SET_MOVER),
  setScore: makeAction(types.SET_SCORE),
  setTimer: makeAction(types.SET_TIMER),
  missMove: makeAction(types.MISS_MOVE),
  resetMissedMoves: makeAction(types.RESET_MISSED_MOVES),
  setAdditionalMove: makeAction(types.SET_ADDITIONAL_MOVE),
  resetAdditionalMove: makeAction(types.RESET_ADDITIONAL_MOVE),
  setScoreToWin: makeAction(types.SET_SCORE_TO_WIN),
});

export default actions;