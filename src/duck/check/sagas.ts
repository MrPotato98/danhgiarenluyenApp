import {put, call, takeLatest, all} from 'redux-saga/effects';
import {UserService} from '../../services/user';
import {
  checkFail,
  checkSuccess,
  getIsCheckSuccess,
  getIsCheckFail,
} from './action';
import {CHECK, GET_IS_CHECK} from './type';

function* handleCheck(action: any) {
  try {
    const data = yield call(UserService.check);
    if (data.data.success) {
      yield put(checkSuccess(data.data));
    } else {
      yield put(checkFail(data.data));
    }
  } catch (e) {
    yield put(checkFail(e));
  }
}

function* handleGetIsCheck(action: any) {
  try {
    const data = yield call(UserService.getIsCheck);
    if (data.data.success) {
      yield put(getIsCheckSuccess(data.data));
    } else {
      yield put(getIsCheckFail(data.data));
    }
  } catch (e) {
    yield put(getIsCheckFail(e));
  }
}
export default function* watchUserSaga() {
  yield all([
    takeLatest(CHECK.CHECK, handleCheck),
    takeLatest(GET_IS_CHECK.GET_IS_CHECK, handleGetIsCheck),
  ]);
}
