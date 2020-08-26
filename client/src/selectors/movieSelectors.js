import { createSelector } from 'reselect';
const getMoviesById = (state) => state.movieReducers.moviesById;

const getActiveMovieId = (state) => state.movieReducers.activeMovieId;

const getMovies = createSelector(
  [getMoviesById],
  (moviesById) => {
    if (moviesById) {
      return Object.values(moviesById);
    }
    return null;
  }
);

const getActiveMovie = createSelector(
  [getMoviesById, getActiveMovieId],
  (moviesById, activeMovieId) => {
    if (moviesById && activeMovieId) {
      return moviesById[activeMovieId];
    }
    return null;
  }
);

export { getMovies, getMoviesById, getActiveMovie, getActiveMovieId };
