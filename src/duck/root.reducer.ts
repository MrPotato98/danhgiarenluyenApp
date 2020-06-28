import {combineReducers} from 'redux';

import userReducer from './user/reducer';
import checkReducer from './check/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  check: checkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
