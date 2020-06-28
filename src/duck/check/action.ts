import {CHECK, GET_IS_CHECK} from './type';
import {CheckRequest, CheckResponse} from '../api-model/check';

const check = () => {
  return {
    type: CHECK.CHECK,
    payload: {},
  };
};

const checkSuccess = (data: CheckResponse) => {
  return {
    type: CHECK.CHECK_SUCCESS,
    payload: {
      data,
    },
  };
};

const checkFail = (error: any) => {
  return {
    type: CHECK.CHECK_FAIL,
    payload: {
      error,
    },
  };
};

const getIsCheck = () => {
  return {
    type: GET_IS_CHECK.GET_IS_CHECK,
    payload: {},
  };
};

const getIsCheckSuccess = (data: CheckResponse) => {
  return {
    type: GET_IS_CHECK.GET_IS_CHECK_SUCCESS,
    payload: {
      data,
    },
  };
};

const getIsCheckFail = (error: any) => {
  return {
    type: GET_IS_CHECK.GET_IS_CHECK_FAIL,
    payload: {
      error,
    },
  };
};

export {
  check,
  checkSuccess,
  checkFail,
  getIsCheck,
  getIsCheckSuccess,
  getIsCheckFail,
};
