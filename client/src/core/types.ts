import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch as Dispatch } from 'redux-thunk';
import { StateType } from 'typesafe-actions';
import rootReducer from 'core/rootReducer';

export type BoundingClientRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

// export type RootState = {
//   movieReducers: any;
//   movieTableReducers: any;
//   tagReducers: any;
//   reviewReducers: any;
// };
export type RootState = StateType<typeof rootReducer>;

export type ThunkDispatch = Dispatch<RootState, null, AnyAction>;
export type ThunkResult = ThunkAction<Promise<any>, RootState, null, AnyAction>;
