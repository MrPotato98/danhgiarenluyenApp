import {fork, all} from 'redux-saga/effects';
import watchUserSaga from './user/sagas';
import watchCheckSaga from './check/sagas';

export default function* rootSaga() {
  yield all([fork(watchUserSaga), fork(watchCheckSaga)]);
}
