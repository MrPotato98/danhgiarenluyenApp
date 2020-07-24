import {GET_TIME_SHEETS, GET_TIME_SHEETS_ADMIN, EVENT} from './type';
import {
  GetTimeSheetResponse,
  GetAdminTimeSheetResponse,
} from '../api-model/get-time-sheets';

const getTimeSheet = () => {
  return {
    type: GET_TIME_SHEETS.GET_TIME_SHEETS,
    payload: {},
  };
};
const getTimeSheetSuccess = (timesheet: GetTimeSheetResponse) => {
  // console.log(info);
  return {
    type: GET_TIME_SHEETS.GET_TIME_SHEETS_SUCCESS,
    payload: {
      timesheet,
    },
  };
};
const getTimeSheetFail = (error: any) => {
  // console.log(info);
  return {
    type: GET_TIME_SHEETS.GET_TIME_SHEETS_FAIL,
    payload: {
      error,
    },
  };
};
export const resetTimeSheets = () => {
  return {
    type: GET_TIME_SHEETS.RESET,
  };
};

const getAdminTimeSheet = () => {
  return {
    type: GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN,
    payload: {},
  };
};

const getAdminTimeSheetSuccess = (timesheet: GetAdminTimeSheetResponse) => {
  // console.log(timesheet);
  return {
    type: GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN_SUCCESS,
    payload: {
      timesheet,
    },
  };
};
const getAdminTimeSheetFail = (error: any) => {
  // console.log(info);
  return {
    type: GET_TIME_SHEETS_ADMIN.GET_TIME_SHEETS_ADMIN_FAIL,
    payload: {
      error,
    },
  };
};
export const resetData = () => {
  return {
    type: EVENT.RESET,
  };
};
export {
  getTimeSheet,
  getTimeSheetSuccess,
  getTimeSheetFail,
  getAdminTimeSheet,
  getAdminTimeSheetSuccess,
  getAdminTimeSheetFail,
};
