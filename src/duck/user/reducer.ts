import * as model from './model';
import {LOGIN} from './type';

const userReducer = (state: {} = model.initialStateUser, action: any) => {
  switch (action.type) {
    case LOGIN.LOADING:
      return Object.assign({}, state, {
        running: true,
        isValidToken: false,
        errorMessage: '',
      });
    case LOGIN.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        running: false,
        token: action.payload.info.token,
        isValidToken: true,
        errorMessage: '',
        success: action.payload.info.success,
        ...action.payload.info,
      });
    case LOGIN.LOGIN_FAIL:
      return Object.assign({}, state, {
        running: false,
        errorMessage: action.payload.error,
      });
    case LOGIN.LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        running: false,
        token: '',
        info: {},
        errorMessage: '',
        isValidToken: false,
        success: false,
      });
    case LOGIN.VERIFY:
      return Object.assign({}, state, {
        ...action.payload,
        running: false,
        isValidToken: action.payload.token ? true : false,
        errorMessage: action.payload.token ? '' : 'Lỗi xác thực.',
      });
    default:
      return state;
  }
};

export default userReducer;
