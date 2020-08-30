import { combineReducers } from 'redux';
import movieReducers from 'movie/reducers';
import movieTableReducers from 'movieTable/reducers';
import tagReducers from 'tag/reducers';
import reviewReducers from 'review/reducers';

export default combineReducers({
  movieReducers,
  movieTableReducers,
  tagReducers,
  reviewReducers,
});
