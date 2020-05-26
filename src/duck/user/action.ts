import {LOGIN} from './type';
import {UserRes, UserReq} from '../api-model/login';

const login = (info: UserReq) => {
  return {
    type: LOGIN.LOADING,
    payload: {
      info,
    },
  };
};

const loginSuccess = (info: UserRes) => {
  return {
    type: LOGIN.LOGIN_SUCCESS,
    payload: {
      info,
    },
  };
};

const loginFail = (error: string) => {
  return {
    type: LOGIN.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};

export {login, loginSuccess, loginFail};
