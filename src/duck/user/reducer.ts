import * as model from './model';
import {LOGIN} from './type';

const userReducer = (state: {} = model.initialStateUser, action: any) => {
  switch (action.type) {
    case LOGIN.LOADING:
      return {
        ...state,
        running: true,
      };
    case LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
      };
    case LOGIN.LOGIN_FAIL:
      return {
        ...state,
        info: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
