import {combineReducers} from 'redux';

import userReducer from './user/reducer';
import checkReducer from './check/reducer';
import timeSheetReducer from './time-sheets/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  check: checkReducer,
  timesheet: timeSheetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
