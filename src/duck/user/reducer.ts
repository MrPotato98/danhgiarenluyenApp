import {User} from './model';
import {LOGIN} from './type';
const initialState: User = {
  info: {},
  token: '',
  loading: false,
};

export const userReducer = (state: {} = initialState, action: any) => {
  switch (action) {
    case LOGIN:
      return {
          
      };
    default:
      return state;
  }
};
