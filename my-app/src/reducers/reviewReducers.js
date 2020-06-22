/* eslint-disable no-fallthrough */
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  POST_REVIEW_SUCCESS,
  PATCH_REVIEW_SUCCESS,
  SET_ACTIVE_REVIEW,
  // SET_FILTERED_IDS,
} from '../actions/reviewActions';

import produce from 'immer';

const initialState = {
  activeReviewId: null,
  filteredIds: null, // TODO decouple table filtering from review store
  reviewsById: {},
};

const parseReview = (review) => ({
  id: review._id,
  movieId: review.movieId,
  text: review.text,
  rating: review.rating,
});

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACTIVE_REVIEW:
        draft.activeReviewId = action.payload;
        return;
      // case SET_FILTERED_IDS:
      //   draft.filteredIds = action.payload;
      //   return;
      case GET_REVIEWS_SUCCESS:
        action.payload.forEach((review) => {
          if (review._id) {
            draft.reviewsById[review._id] = parseReview(review);
          }
        });
        return;
      case GET_REVIEW_SUCCESS:
        const review = action.payload;
        draft.reviewsById[review._id] = parseReview(review);
        return;
      case DELETE_REVIEW_SUCCESS: {
        const { [action.payload.id]: deleted, ...rest } = draft.reviewsById;
        draft.reviewsById = rest;
        return;
      }
      case POST_REVIEW_SUCCESS: {
        if (action.payload.data) {
          draft.reviewsById[action.payload.data._id] = parseReview(
            action.payload.data
          );
        }
        return;
      }
      case PATCH_REVIEW_SUCCESS: {
        draft.reviewsById[action.payload.id] = {
          id: action.payload.id,
          ...draft.reviewsById[action.payload.id],
          ...action.payload.data,
        };
      }
    }
  });
