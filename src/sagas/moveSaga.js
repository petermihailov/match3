import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import animations from './../animations'
import {put, call, takeEvery, select} from 'redux-saga/effects'
import {NotificationManager} from './../components/notifications'
import {delay} from 'redux-saga'
import {getGame} from './selectors'
import {endMove} from './gameSaga'

const DELAY = 200;

export default function* moveSaga() {
  yield takeEvery(types.grid.MOVE, move);
  yield takeEvery(types.game.MISS_MOVE, endMove);
}

function* move(action) {
  yield put(actions.grid.lock(true));

  const {from, to} = action.payload;
  const {rows, cols} = yield select(getGame);

  if (to.row < rows && to.col < cols) {
    yield call(swap, {from, to});

    const {grid} = yield select(getGame);
    const matches = m3.getMatches(grid);

    if (matches.length > 0) {
      yield put(actions.game.resetMissedMoves());
      yield call(findAndRemoveMatches, matches);
    } else {
      yield call(swap, {from: to, to: from});
      yield put(actions.grid.lock(false));
    }
  } else {
    yield put(actions.grid.lock(false));
  }
}

// move side effects
function* swap({from, to}) {
  yield call(animations.grid.swap, {from, to});
  yield put(actions.grid.swap({from, to}));
}

function* removeMatches(matches) {
  yield call(animations.grid.removeMatches, matches);
  yield put(actions.grid.removeMatches(matches));
}

function* applyGravity() {
  const {grid} = yield select(getGame);

  yield call(animations.grid.applyGravity, grid);
  yield put(actions.grid.applyGravity());
}

function* fillVoid() {
  const {grid, types} = yield select(getGame);
  const changes = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        changes.push({row, col, piece: {type: Math.floor(Math.random() * types) + 1}});
      }
    }
  }

  yield put(actions.grid.fillVoid(changes));
  yield call(animations.grid.fillVoid, changes);
}

function* findAndRemoveMatches(matches, acc = []) {
  if (matches.length > 0) {
    acc.push(...matches);

    yield call(handleAdditionMove, matches);
    yield call(removeMatches, matches);
    yield call(applyGravity);
    yield call(fillVoid);
    yield delay(DELAY);

    const {grid} = yield select(getGame);
    yield call(findAndRemoveMatches, m3.getMatches(grid), acc);
  } else {
    yield call(endMove, sumPoints(sumRemoved(acc)));
  }
}

function* handleAdditionMove(matches) {
  if (matches.find((m) => m.length > 4)) {
    NotificationManager.info('Дополнительный ход!', '5 в ряд!');
    yield put(actions.game.setAdditionalMove());
  }
}

export function sumRemoved(matches) {
  return matches.reduce((acc, match) => {
    if (!acc.hasOwnProperty(match.type)) {
      acc[match.type] = 0;
    }

    acc[match.type] += match.length;

    return acc;
  }, {})
}

export function sumPoints(removed) {
  return Object.keys(removed).reduce((acc, type) => acc += type * 100 * removed[type], 0);
}