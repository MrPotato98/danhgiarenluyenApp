import {CheckRequest, CheckResponse} from '../api-model/check';
import {GetIsCheckRequest, GetIsCheckResponse} from '../api-model/get-is-check';

export type StateCheckType = {
  result: CheckResponse;
  running: boolean;
  isCheck: GetIsCheckResponse;
};

export const initCheck: CheckResponse = {
  success: false,
  result: {
    _id: '',
    checkin: '',
    checkout: '',
    date: '',
    user: '',
  },
};

export const initCheckRequest: CheckRequest = {};

export const initIsCheckinRes: GetIsCheckResponse = {
  success: false,
  result: false,
};

export const initIsCheckinReq: GetIsCheckRequest = {};

export const initialStateUser: StateCheckType = {
  running: false,
  result: initCheck,
  isCheck: initIsCheckinRes,
};
