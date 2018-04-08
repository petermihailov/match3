import * as m3 from 'm3lib';
import {types} from '../actions';

const initialState = {
  grid: [[]],
  cols: 6,
  rows: 6,
  types: 5,
  locked: true,
  mover: null,
  moveExpireAt: null,
  players: {
    left: {
      name: '🎃',
      score: 0,
      missedMoves: 0
    },
    right: {
      name: '🥕',
      score: 0,
      missedMoves: 0
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
      return ({
        ...state,
        players: setScore(state, action.payload)
      });

    case types.game.SET_TIMER:
      return ({
        ...state,
        moveExpireAt: action.payload
      });

    case types.game.MISS_MOVE:
      return ({
        ...state,
        players: missMove(state)
      });

    case types.game.RESET_MISSED_MOVES:
      return ({
        ...state,
        players: resetMissedMoves(state)
      });

    default:
      return state;
  }
}

function setScore(state, {mover, score}) {
  const players = {
    left: {...state.players.left},
    right: {...state.players.right}
  };

  players[mover].score = score;

  return players;
}

function missMove(state) {
  const players = {
    left: {...state.players.left},
    right: {...state.players.right}
  };

  players[state.mover].missedMoves += 1;

  return players
}

function resetMissedMoves(state) {
  const players = {
    left: {...state.players.left},
    right: {...state.players.right}
  };

  players[state.mover].missedMoves = 0;

  return players
}