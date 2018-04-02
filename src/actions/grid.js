import {makeAction} from './../utils'

export const types = {
  CREATE_LEVEL: 'CREATE_LEVEL',
  SET_GRID: 'SET_GRID',
  MOVE: 'MOVE',
};

const actions = ({
  createLevel: makeAction(types.CREATE_LEVEL),
  setGrid: makeAction(types.SET_GRID),
  move: makeAction(types.MOVE),
});

export default actions;