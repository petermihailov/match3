import {makeAction} from './../utils'

export const types = {
  SET_MOVER: 'SET_MOVER',
  SET_SCORE: 'SET_SCORE',
};

const actions = ({
  setMover: makeAction(types.SET_MOVER),
  setScore: makeAction(types.SET_SCORE),
});

export default actions;