import {makeAction} from './../utils'

export const types = {
  CREATE_LEVEL: 'CREATE_LEVEL',
  SWAP: 'SWAP',
  REMOVE_MATCHES: 'REMOVE_MATCHES',
  APPLY_GRAVITY: 'APPLY_GRAVITY',
  FILL_VOID: 'FILL_VOID',
  SET_GRID: 'SET_GRID',
  MOVE: 'MOVE',
};

const actions = ({
  createLevel: makeAction(types.CREATE_LEVEL),
  swap: makeAction(types.SWAP),
  removeMatches: makeAction(types.REMOVE_MATCHES),
  applyGravity: makeAction(types.APPLY_GRAVITY),
  fillVoid: makeAction(types.FILL_VOID),
  setGrid: makeAction(types.SET_GRID),
  move: makeAction(types.MOVE),
});

export default actions;