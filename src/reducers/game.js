import * as m3 from 'm3lib';
import {types} from '../actions';

const initialState = {
  grid: m3.createLevel({cols: 6, rows: 6, types: 5}),
  cols: 6,
  rows: 6,
  types: 5,
  locked: false,
  mover: Math.random() >= 0.5 ? 'left' : 'right',
  players: {
    left: {
      name: '🎃',
      score: 0
    },
    right: {
      name: '🥕',
      score: 0
    }
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    // grid reducers
    case types.grid.LOCK:
      return ({
        ...state,
        locked: action.payload
      });
    case types.grid.CREATE_LEVEL:
      return ({
        ...state,
        grid: m3.createLevel({cols: state.cols, rows: state.rows, types: state.types})
      });
    case types.grid.SWAP:
      return ({
        ...state,
        grid: m3.swap(state.grid, action.payload)
      });
    case types.grid.REMOVE_MATCHES:
      return ({
        ...state,
        grid: m3.removeMatches(state.grid, action.payload)
      });
    case types.grid.APPLY_GRAVITY:
      return ({
        ...state,
        grid: m3.applyGravity(state.grid)
      });
    case types.grid.FILL_VOID:
      return ({
        ...state,
        grid: m3.fillVoid(state.grid, state.types)
      });
    case types.grid.SET_GRID:
      return ({
        ...state,
        grid: action.payload
      });

    // game reducers
    case types.game.SET_MOVER:
      return ({
        ...state,
        mover: action.payload
      });
    case types.game.SET_SCORE:
      const players = {
        left: {...state.players.left},
        right: {...state.players.right}
      };

      players[action.payload.mover].score = action.payload.score;

      return ({
        ...state,
        players
      });
    default:
      return state;
  }
}