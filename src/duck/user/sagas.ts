import {takeEvery, put, call, takeLatest, all} from 'redux-saga/effects';
import {UserService} from '../../services/user';
import {loginSuccess, loginFail, verify} from './action';
import {LOGIN} from './type';
import AsyncStorage from '@react-native-community/async-storage';
import {FILE_USER_TOKEN} from '../../common/constants';

const saveUserInfo = async (data: any) => {
  await AsyncStorage.setItem(FILE_USER_TOKEN, data);
};
function* handleLogin(action: any) {
  try {
    const {email, password} = action.payload.info;
    const data = yield call(UserService.login, email, password);
    if (data.data.success) {
      yield call(saveUserInfo, data.data.token);
      yield put(loginSuccess(data.data));
    } else {
      yield put(loginFail(data.data));
    }
  } catch (e) {
    yield put(loginFail(e));
  }
}
// function* handleVerify(action: any) {
//   try {
//     const data = yield call(UserService.verify);
//     console.log(data);
//     if (data.data.success) {
//       yield put(verify(data.data));
//     } else {
//       console.log('error');
//     }
//   } catch (e) {
//     AsyncStorage.setItem(FILE_USER_TOKEN, '');
//     console.log(e);
//   }
// }
export default function* watchUserSaga() {
  yield all([
    takeLatest(LOGIN.LOADING, handleLogin),
    // takeLatest(LOGIN.VERIFY, handleVerify),
  ]);
}
