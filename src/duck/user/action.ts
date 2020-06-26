import {LOGIN} from './type';
import {UserRes, UserReq} from '../api-model/login';
import AsyncStorage from '@react-native-community/async-storage';
import {FILE_USER_TOKEN} from '../../common/constants';

const login = (info: UserReq) => {
  // console.log(info);
  return {
    type: LOGIN.LOADING,
    payload: {
      info,
    },
  };
};

const loginSuccess = (info: UserRes) => {
  // console.log(info);
  return {
    type: LOGIN.LOGIN_SUCCESS,
    payload: {
      info,
    },
  };
};

const loginFail = (error: any) => {
  // console.log(error);
  return {
    type: LOGIN.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};
export const verify = ({token, info, success}: any) => {
  return {
    type: LOGIN.VERIFY,
    payload: {
      token,
      info,
      success,
    },
  };
};
export const logOut = () => {
  AsyncStorage.removeItem(FILE_USER_TOKEN);
  return {
    type: LOGIN.LOGOUT,
  };
};
export {login, loginSuccess, loginFail};
