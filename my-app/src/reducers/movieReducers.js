/* eslint-disable no-fallthrough */
import {
  GET_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS,
  DELETE_MOVIE_SUCCESS,
  POST_MOVIE_SUCCESS,
  PATCH_MOVIE_SUCCESS,
  SET_ACTIVE_MOVIE,
  // SET_FILTERED_IDS,
} from '../actions/movieActions';

import produce from 'immer';

const initialState = {
  activeMovieId: null,
  filteredIds: null, // TODO decouple table filtering from movie store
  moviesById: {},
};

const parseMovie = (movie) => ({
  id: movie._id,
  title: movie.title,
  fixed: movie.fixed,
  averageRating: movie.averageRating,
  tags: movie.tags || [], // preserve empty arrays
});

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACTIVE_MOVIE:
        draft.activeMovieId = action.payload;
        return;
      // case SET_FILTERED_IDS:
      //   draft.filteredIds = action.payload;
      //   return;
      case GET_MOVIES_SUCCESS:
        action.payload.forEach((movie) => {
          if (movie._id) {
            draft.moviesById[movie._id] = parseMovie(movie);
          }
        });
        return;
      case GET_MOVIE_SUCCESS:
        const movie = action.payload;
        draft.moviesById[movie._id] = parseMovie(movie);
        return;
      case DELETE_MOVIE_SUCCESS: {
        const { [action.payload.id]: deleted, ...rest } = draft.moviesById;
        draft.moviesById = rest;
        return;
      }
      case POST_MOVIE_SUCCESS: {
        if (action.payload.data) {
          draft.moviesById[action.payload.data._id] = parseMovie(
            action.payload.data
          );
        }
        return;
      }
      case PATCH_MOVIE_SUCCESS: {
        draft.moviesById[action.payload.id] = {
          id: action.payload.id,
          ...draft.moviesById[action.payload.id],
          ...action.payload.data,
        };
      }
    }
  });
