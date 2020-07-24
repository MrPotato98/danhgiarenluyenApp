import * as model from './model';
import {CHECK, GET_IS_CHECK} from './type';
import {initialStateUser} from './model';

const userReducer = (state: {} = model.initialStateUser, action: any) => {
  switch (action.type) {
    case CHECK.CHECK:
      return Object.assign({}, state, {
        running: true,
      });
    case CHECK.CHECK_SUCCESS:
      return Object.assign({}, state, {
        running: false,
        result: action.payload.data,
      });
    case CHECK.CHECK_FAIL:
      return Object.assign({}, state, {
        running: false,
        errorMessage: action.payload.error,
      });
    case GET_IS_CHECK.GET_IS_CHECK:
      return Object.assign({}, state, {
        running: true,
      });
    case GET_IS_CHECK.GET_IS_CHECK_SUCCESS:
      return Object.assign({}, state, {
        running: false,
        isCheck: action.payload.data,
      });
    case GET_IS_CHECK.GET_IS_CHECK_FAIL:
      return Object.assign({}, state, {
        running: false,
        errorMessage: action.payload.error,
      });
    case CHECK.RESET:
      return Object.assign({}, state, initialStateUser);
    default:
      return state;
  }
};

export default userReducer;
