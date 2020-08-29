import { createSelector } from 'reselect';

import { getMoviesById } from './movieSelectors';
import { getTagsById } from 'tag';

// const base = state...

const getFilteredIds = (state) => state.movieTableReducers.filteredIds;

const getFilters = (state) => state.movieTableReducers.filters;

// const getFilterTagIds2 = (state) => state.movieTableReducers.filters.filterTag;

const getFilterTagIds = createSelector(
  [getFilters],
  (filters) => {
    return filters.filterTag ? [filters.filterTag.value] : [];
  }
);

const getMoviesFiltered = createSelector(
  [getMoviesById, getFilteredIds],
  (moviesById, filteredIds) => {
    if (moviesById) {
      if (filteredIds) {
        return filteredIds.map((id) => moviesById[id]).filter((m) => !!m);
      }
      return Object.values(moviesById); // no filtering, return all
    }
    return null;
  }
);

const getFilterTags = createSelector(
  [getTagsById, getFilterTagIds],
  (tagsById, filterTagIds) => {
    if (tagsById) {
      return filterTagIds.map((id) => tagsById[id]).filter((m) => !!m);
    }
    return null;
  }
);

export { getMoviesFiltered, getFilters, getFilterTags };
