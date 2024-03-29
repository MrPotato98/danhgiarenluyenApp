import {fork, all} from 'redux-saga/effects';
import watchUserSaga from './user/sagas';
import watchCheckSaga from './check/sagas';
import watchTimeSheetSaga from './time-sheets/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchUserSaga),
    fork(watchCheckSaga),
    fork(watchTimeSheetSaga),
  ]);
}
