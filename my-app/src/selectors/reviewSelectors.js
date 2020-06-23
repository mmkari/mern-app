import { createSelector } from 'reselect';

import { getActiveMovieId } from './movieSelectors';

const getReviewsById = (state) => state.reviewReducers.reviewsById;

const getAverageRatingsByMovieId = (state) =>
  state.reviewReducers.averageRatingsByMovieId;

const getReviews = createSelector(
  [getReviewsById],
  (reviewsById) => {
    if (reviewsById) {
      return Object.values(reviewsById);
    }
    return null;
  }
);

const getActiveMovieReviews = createSelector(
  [getReviews, getActiveMovieId],
  (reviews, activeMovieId) => {
    if (reviews && activeMovieId) {
      return reviews.filter((r) => r.movieId === activeMovieId);
    }
    return null;
  }
);

export {
  getReviews,
  getReviewsById,
  getActiveMovieReviews,
  getAverageRatingsByMovieId,
};
