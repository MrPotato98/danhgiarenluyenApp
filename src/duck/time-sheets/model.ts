import {
  GetTimeSheetResponse,
  GetTimeSheetRequest,
  GetAdminTimeSheetResponse,
} from '../api-model/get-time-sheets';

export type StateTimeSheetType = {
  result: GetTimeSheetResponse;
  admin: GetAdminTimeSheetResponse;
  running: boolean;
};
export const initTimeSheetRequest: GetTimeSheetRequest = {};

export const initTimeSheets: GetTimeSheetResponse = {
  success: false,
  result: [
    {
      _id: '',
      user: '',
      checkin: '',
      checkout: '',
      date: '',
    },
  ],
};
export const initAdminTimeSheets: GetAdminTimeSheetResponse = {
  success: false,
  result: {
    user: '',
    timesheet: {
      _id: '',
      user: '',
      checkin: '',
      checkout: '',
      date: '',
    },
  },
};
export const initialStateUser: StateTimeSheetType = {
  result: initTimeSheets,
  admin: initAdminTimeSheets,
  running: false,
};
