import {put, call, takeLatest, all} from 'redux-saga/effects';
import {UserService} from '../../services/user';
import {
  getTimeSheetSuccess,
  getTimeSheetFail,
  getAdminTimeSheetSuccess,
  getAdminTimeSheetFail,
} from './action';
import {GET_TIME_SHEETS, GET_TIME_SHEETS_ADMIN} from './type';

function* handleGetTimeSheet(action: any) {
  try {
    const data = yield call(UserService.getTimeSheet);
    // console.log(data);
    if (data.data.success) {
      yield put(getTimeSheetSuccess(data.data));
    } else {
      yield put(getTimeSheetFail(data.data));
    }
  } catch (e) {
    yield put(getTimeSheetFail(e));
  }
}
function* handleGetAdminTimeSheet(action: any) {
  try {
    const data = yield call(UserService.getAdminTimeSheet);
    // console.log(data.data);
    if (data.data.success) {
      yield put(getAdminTimeSheetSuccess(data.data));
      // console.log(data.data);
    } else {
      yield put(getAdminTimeSheetFail(data.data));
    }
  } catch (e) {
    yield put(getAdminTimeSheetFail(e));
  }
}
export default function* watchUserSaga() {
  yield all([
    takeLatest(GET_TIME_SHEETS.GET_TIME_SHEETS, handleGetTimeSheet),
    takeLatest(
      GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN,
      handleGetAdminTimeSheet,
    ),
  ]);
}
