import {LOGIN} from './type';
import {UserRes, UserReq} from '../api-model/login';

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
  console.log(info);
  return {
    type: LOGIN.LOGIN_SUCCESS,
    payload: {
      info,
    },
  };
};

const loginFail = (error: string) => {
  console.log(error);
  return {
    type: LOGIN.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};

export {login, loginSuccess, loginFail};
