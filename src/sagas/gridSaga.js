import * as m3 from 'm3lib';
import actions, {types} from './../actions/grid'
import animations from './../animations/grid'
import {put, call, takeLatest, select} from 'redux-saga/effects'
import {getGrid} from './selectors'

const TYPES = 5;
const DELAY = 200;

import {delay} from 'redux-saga'

export default function* gridSaga() {
  yield takeLatest(types.MOVE, move);
}

function* move(action) {
  const {gridNode, from, to} = action.payload;

  yield call(swap, {gridNode, from, to});

  const {grid} = yield select(getGrid);
  const matches = m3.getMatches(grid);

  if (matches.length > 0) {
    yield call(findAndRemoveMatches, matches);
  } else {
    yield call(swap, {gridNode, from: to, to: from});
  }
}

function* swap({gridNode, from, to}) {
  const {grid} = yield select(getGrid);
  yield call(animations.swap, {gridNode, from, to});
  yield put(actions.setGrid(m3.swap(grid, {from, to})));
}

function* removeMatches(matches) {
  const {grid} = yield select(getGrid);
  yield put(actions.setGrid(m3.removeMatches(grid, matches)));
}

function* applyGravity() {
  const {grid} = yield select(getGrid);
  yield put(actions.setGrid(m3.applyGravity(grid)));
}

function* fillVoid() {
  const {grid} = yield select(getGrid);
  yield put(actions.setGrid(m3.fillVoid(grid, TYPES)));
}

function* findAndRemoveMatches(matches, acc = []) {
  if (matches.length > 0) {
    acc.push(...matches);
    yield call(removeMatches, matches);
    yield delay(DELAY);
    yield call(applyGravity);
    yield delay(DELAY);
    yield call(fillVoid);
    yield delay(DELAY);

    const {grid} = yield select(getGrid);
    yield call(findAndRemoveMatches, m3.getMatches(grid), acc);
  } else {
    console.log(`matches: ${acc.length}, points: %c ${sumPoints(sumRemoved(acc))} `, 'background: #222; color: #bada55');
  }
}

function sumRemoved(matches) {
  return matches.reduce((acc, match) => {
    if (!acc.hasOwnProperty(match.type)) {
      acc[match.type] = 0;
    }

    acc[match.type] += match.length;
    return acc;
  }, {})
}

function sumPoints(removed) {
  return Object.keys(removed).reduce((acc, type) => acc += type * 100 * removed[type], 0);
}