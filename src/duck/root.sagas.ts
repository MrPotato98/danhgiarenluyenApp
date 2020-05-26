import {fork, all} from 'redux-saga/effects';
import watchUserSaga from './user/sagas';

export default function* rootSaga() {
  yield all([fork(watchUserSaga)]);
}
