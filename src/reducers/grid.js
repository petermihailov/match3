import * as m3 from 'm3lib';
import {types} from '../actions/grid';

const initialState = {
  grid: m3.createLevel({cols: 6, rows: 6, types: 5}),
  cols: 6,
  rows: 6,
  types: 5,
  locked: false
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CREATE_LEVEL:
      return ({
        ...state,
        grid: m3.createLevel({cols: state.cols, rows: state.rows, types: state.types}),
      });
    case types.SET_GRID:
      return ({
        ...state,
        grid: action.payload
      });
    default:
      return state;
  }
}