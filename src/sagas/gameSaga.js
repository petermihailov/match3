import * as m3 from 'm3lib';
import actions, {types} from '../actions'
import animations from './../animations/grid'
import {put, call, takeEvery, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {getGame} from './selectors'

const DELAY = 200;

export default function* gameSaga() {
  yield takeEvery(types.grid.MOVE, move);
}

function* move(action) {
  const {gridNode, from, to} = action.payload;

  yield call(swap, {gridNode, from, to});

  const {grid} = yield select(getGame);
  const matches = m3.getMatches(grid);

  if (matches.length > 0) {
    yield call(findAndRemoveMatches, matches);
  } else {
    yield call(swap, {gridNode, from: to, to: from});
  }
}

function* swap({gridNode, from, to}) {
  yield call(animations.swap, {gridNode, from, to});
  yield put(actions.grid.swap({from, to}));
}

function* removeMatches(matches) {
  yield put(actions.grid.removeMatches( matches));
}

function* applyGravity() {
  yield put(actions.grid.applyGravity());
}

function* fillVoid() {
  yield put(actions.grid.fillVoid());
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

    const {grid} = yield select(getGame);
    yield call(findAndRemoveMatches, m3.getMatches(grid), acc);
  } else {
    const {grid} = yield select(getGame);

    yield addPoints(sumPoints(sumRemoved(acc)));

    if (m3.getMoves(grid).length === 0) {
      console.log('not moves, regenerating field');
      yield put(actions.grid.CREATE_LEVEL());
    }

    yield switchMover();
  }
}

function* addPoints(points) {
  const {mover, players} = yield select(getGame);
  const score = players[mover].score + points;

  yield put(actions.game.setScore({mover, score}));

  if (score >= 10000) {
    alert(`Player ${players[mover].name} win!`)
  }
}

function* switchMover() {
  const {mover} = yield select(getGame);
  yield put(actions.game.setMover(mover === 'left' ? 'right' : 'left'));
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