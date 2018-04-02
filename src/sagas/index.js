import {all, fork} from "redux-saga/effects";
import gridSaga from './gridSaga';

export default function* run() {
  yield all([
    fork(gridSaga)
  ]);
}
