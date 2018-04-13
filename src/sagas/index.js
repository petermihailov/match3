import {all, fork} from "redux-saga/effects";
import gameSaga from './gameSaga';
import botSaga from './botSaga';

export default function* run() {
  yield all([
    fork(gameSaga),
    fork(botSaga),
  ]);
}
