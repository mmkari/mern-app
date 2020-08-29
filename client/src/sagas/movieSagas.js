import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  GET_MOVIES_SUCCESS,
  getMoviesRequest,
  getMoviesSuccess,
} from 'movie/actions';

import { setFilteredResults, SET_FILTERS } from '../actions/movieTableActions';
import apiRequest from '../api.js';

import { getFilters } from '../selectors/movieTableSelectors';

export function* getMoviesSaga(query) {
  try {
    const response = yield call(apiRequest, 'movies', {
      query: query,
    });

    yield put(getMoviesSuccess(response, query));

    return response;
  } catch (error) {
    // yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* updateMovieTableFilters(action) {
  try {
    // && Object.keys(action.query).length !== 0
    if (action.query) {
      // results are for request with query filters
      // dispatch action to update filtered IDs and filters

      yield put(
        setFilteredResults(
          action.payload
            .map((movie) => (movie ? movie._id : undefined))
            .filter((m) => !!m),
          action.query
        )
      );
    }
    // const data = yield call(Api.fetchUser, action.payload.url);
    // yield put({ type: 'FETCH_SUCCEEDED', data });
  } catch (error) {
    // yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* getMoviesWithFilters(action) {
  try {
    // const query = select(getFilters); // convert to query

    const { filters } = action.payload;
    // convert filters into query?
    const query = { ...filters };
    if (filters.filterTag) {
      query.filterTag = filters.filterTag.value;
    }
    if (filters.minRating) {
      query.minRating = filters.minRating.value;
    }
    if (filters.maxRating) {
      query.maxRating = filters.maxRating.value;
    }
    const response = yield call(getMoviesSaga, query);

    yield put(
      setFilteredResults(
        response
          .map((movie) => (movie ? movie._id : undefined))
          .filter((m) => !!m)
      )
    );
  } catch (error) {
    // yield put({ type: 'FETCH_FAILED', error });
  }
}

function* getMoviesSuccessSaga() {
  yield takeEvery(GET_MOVIES_SUCCESS, updateMovieTableFilters);
}

function* setFiltersSaga() {
  yield takeEvery(SET_FILTERS, getMoviesWithFilters);
}

export const movieSagas = [getMoviesSuccessSaga(), setFiltersSaga()];
