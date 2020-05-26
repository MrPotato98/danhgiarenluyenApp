import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import {RootState} from './root.reducer';

export const useMemoSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
