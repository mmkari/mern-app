import apiRequest from 'core/api';

export const GET_REVIEWS_SUCCESS = 'actions/GET_REVIEWS_SUCCESS';
export const DELETE_REVIEW_SUCCESS = 'actions/DELETE_REVIEW_SUCCESS';
export const POST_REVIEW_SUCCESS = 'actions/POST_REVIEW_SUCCESS';
export const PATCH_REVIEW_SUCCESS = 'actions/PATCH_REVIEW_SUCCESS';

export const SET_ACTIVE_REVIEW = 'actions/SET_ACTIVE_REVIEW';
// export const SET_FILTERED_IDS = 'actions/SET_FILTERED_IDS'; // decouple
export const GET_REVIEW_SUCCESS = 'actions/GET_REVIEW_SUCCESS';
export const GET_REVIEW_AVERAGE_RATINGS_SUCCESS =
  'actions/GET_REVIEW_AVERAGE_RATINGS_SUCCESS';

export const setActiveReview = (id) => {
  return {
    type: SET_ACTIVE_REVIEW,
    payload: id,
  };
};

// export const setFilteredIds = (ids) => {
//   return {
//     type: SET_FILTERED_IDS,
//     payload: ids,
//   };
// };

export const getReviewAverageRatingsSuccess = (data, query) => {
  return {
    type: GET_REVIEW_AVERAGE_RATINGS_SUCCESS,
    payload: data,
    query,
  };
};

export const getReviewsSuccess = (data, query) => {
  return {
    type: GET_REVIEWS_SUCCESS,
    payload: data,
    query,
  };
};

export const getReviewSuccess = (data) => {
  return {
    type: GET_REVIEW_SUCCESS,
    payload: data,
  };
};

export const deleteReviewSuccess = (id) => {
  return {
    type: DELETE_REVIEW_SUCCESS,
    payload: { id },
  };
};

export const postReviewSuccess = (data) => {
  return {
    type: POST_REVIEW_SUCCESS,
    payload: { data },
  };
};

export const patchReviewSuccess = (id, data) => {
  return {
    type: PATCH_REVIEW_SUCCESS,
    payload: { id, data },
  };
};

export const getReviewRequest = (id) => (dispatch) =>
  apiRequest(`reviews/${id}`)
    .then((res) => {
      dispatch(getReviewSuccess(res));
      return res;
    })
    .catch();

export const getReviewsAggregateAverageRatingByMovieRequest = (query) => (
  dispatch
) =>
  apiRequest('reviews/aggregate/average_rating_by_movie', { query })
    .then((res) => dispatch(getReviewAverageRatingsSuccess(res, query)))
    .catch();
// .then((res) => dispatch(getReviewsSuccess(res, query)))

export const getReviewsRequest = (query) => (dispatch) =>
  apiRequest('reviews', {
    query: query,
  })
    .then((res) => dispatch(getReviewsSuccess(res, query)))
    .then((res) => {
      if (query) {
      } else {
        // clear filtered ids since no query
      }
    })
    .catch();

export const postReviewRequest = (data) => (dispatch) =>
  apiRequest(`reviews`, {
    method: 'post',
    data: data,
  })
    .then((res) => {
      dispatch(postReviewSuccess(res));
    })
    .catch();

export const patchReviewRequest = (id, data) => (dispatch) =>
  apiRequest(`reviews/${id}`, {
    method: 'patch',
    data: data,
  })
    .then((res) => {
      dispatch(patchReviewSuccess(id, res));
    })
    .catch();

export const deleteReviewRequest = (id) => (dispatch) =>
  apiRequest(`reviews/${id}`, { method: 'delete' })
    .then(() => dispatch(deleteReviewSuccess(id)))
    .catch();
