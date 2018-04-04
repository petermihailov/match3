import {all, fork} from "redux-saga/effects";
import gameSaga from './gameSaga';

export default function* run() {
  yield all([
    fork(gameSaga)
  ]);
}
