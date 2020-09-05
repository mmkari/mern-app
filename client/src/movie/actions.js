import apiRequest from 'core/api';

import {
  GET_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS,
  DELETE_MOVIE_SUCCESS,
  POST_MOVIE_SUCCESS,
  PATCH_MOVIE_SUCCESS,
  SET_ACTIVE_MOVIE,
  // SET_FILTERED_IDS,
} from 'movie/types';

export const setActiveMovie = (id) => {
  return {
    type: SET_ACTIVE_MOVIE,
    payload: id,
  };
};

// export const setFilteredIds = (ids) => {
//   return {
//     type: SET_FILTERED_IDS,
//     payload: ids,
//   };
// };

export const getMoviesSuccess = (data, query) => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: data,
    query,
  };
};

export const getMovieSuccess = (data) => {
  return {
    type: GET_MOVIE_SUCCESS,
    payload: data,
  };
};

export const deleteMovieSuccess = (id) => {
  return {
    type: DELETE_MOVIE_SUCCESS,
    payload: { id },
  };
};

export const postMovieSuccess = (data) => {
  return {
    type: POST_MOVIE_SUCCESS,
    payload: { data },
  };
};

export const patchMovieSuccess = (id, data) => {
  return {
    type: PATCH_MOVIE_SUCCESS,
    payload: { id, data },
  };
};

export const getMovieRequest = (id) => (dispatch) =>
  apiRequest(`movies/${id}`)
    .then((res) => {
      dispatch(getMovieSuccess(res));
      return res;
    })
    .catch();

export const getMoviesAggregateRatingGroupsRequest = (query) => (dispatch) =>
  apiRequest('movies/aggregate/rating_groups')
    .then((res) => res)
    .catch();
// .then((res) => dispatch(getMoviesSuccess(res, query)))

export const getMoviesRequest = (query) => (dispatch) =>
  apiRequest('movies', {
    query: query,
  })
    .then((res) => dispatch(getMoviesSuccess(res, query)))
    .then((res) => {
      if (query) {
      } else {
        // clear filtered ids since no query
      }
    })
    .catch();

export const postMovieRequest = (data) => (dispatch) =>
  apiRequest(`movies`, {
    method: 'post',
    data: data,
  })
    .then((res) => {
      dispatch(postMovieSuccess(res));
    })
    .catch();

export const patchMovieRequest = (id, data) => (dispatch) =>
  apiRequest(`movies/${id}`, {
    method: 'patch',
    data: data,
  })
    .then((res) => {
      dispatch(patchMovieSuccess(id, res));
    })
    .catch();

export const deleteMovieRequest = (id) => (dispatch) =>
  apiRequest(`movies/${id}`, { method: 'delete' })
    .then(() => dispatch(deleteMovieSuccess(id)))
    .catch();
