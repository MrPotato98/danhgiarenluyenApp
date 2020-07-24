import {UserRes, UserReq} from '../api-model/login';

export type StateUserType = {
  info: UserRes;
  running: boolean;
};

export const initUser: UserRes = {
  token: '',
  email: '',
  info: {
    _id: '',
    email: '',
    full_name: '',
    password: null,
    job_id: 0,
    address: '',
    tel: '',
    work_place: '',
    gender: false,
    deleted: false,
  },
  success: false,
  isValidToken: false,
  errorMessage: '',
};

export const initialStateUser: StateUserType = {
  info: initUser,
  running: false,
};
