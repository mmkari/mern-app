import { combineReducers } from 'redux';
import movieReducers from './movieReducers';
import movieTableReducers from './movieTableReducers';
import tagReducers from './tagReducers';

export default combineReducers({
  movieReducers,
  movieTableReducers,
  tagReducers,
});
