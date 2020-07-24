import * as model from './model';
import {GET_TIME_SHEETS, GET_TIME_SHEETS_ADMIN, EVENT} from './type';
import {initialStateUser} from './model';

const timeSheetReducer = (state: {} = model.initialStateUser, action: any) => {
  switch (action.type) {
    case GET_TIME_SHEETS.GET_TIME_SHEETS:
      return Object.assign({}, state, {
        running: true,
      });
    case GET_TIME_SHEETS.GET_TIME_SHEETS_SUCCESS:
      return Object.assign({}, state, {
        running: false,
        result: action.payload.timesheet,
      });
    case GET_TIME_SHEETS.GET_TIME_SHEETS_FAIL:
      return Object.assign({}, state, {
        running: false,
        errorMessage: action.payload.error,
      });
    case GET_TIME_SHEETS.RESET:
      return Object.assign({}, state, initialStateUser);
    case GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN:
      return Object.assign({}, state, {
        running: true,
      });
    case GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        running: false,
        admin: action.payload.timesheet,
      });
    case GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN_FAIL:
      return Object.assign({}, state, {
        running: false,
        errorMessage: action.payload.error,
      });
    // case EVENT.RESET:
    //   return Object.assign({}, state, {
    //     running: false,
    //     result: action.payload.timesheet,
    //   });
    default:
      return state;
  }
};

export default timeSheetReducer;
