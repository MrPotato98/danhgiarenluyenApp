import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {UserService} from '../../services/user';
import {loginSuccess, loginFail} from './action';
import {LOGIN} from './type';

function* handleLogin(action: any) {
  try {
    const {email, password} = action.payload.info;
    const data = yield call(UserService.login, email, password);
    console.log(data);
    if (data.data.success) {
      yield put(loginSuccess(data.data));
    } else {
      yield put(loginFail(data.data));
    }
  } catch (e) {
    yield put(loginFail(e));
  }
}

export default function* watchUserSaga() {
  yield takeLatest(LOGIN.LOADING, handleLogin);
}
