import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from 'typesafe-actions';
import rootReducer from 'core/rootReducer';

// export type RootState = {
//   movieReducers: any;
//   movieTableReducers: any;
//   tagReducers: any;
//   reviewReducers: any;
// };
export type RootState = StateType<typeof rootReducer>;

export type ThunkResult<R> = ThunkAction<R, RootState, null, Action<string>>;
