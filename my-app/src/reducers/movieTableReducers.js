/* eslint-disable no-fallthrough */
import {
  SET_FILTERED_RESULTS,
  SET_FILTERS,
} from '../actions/movieTableActions';

import produce from 'immer';

const initialFilters = {};

const initialState = {
  filteredIds: null,
  filters: initialFilters,
  //
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //   case SET_FILTERED_IDS:
      //     draft.filteredIds = action.payload;
      //     return;
      case SET_FILTERED_RESULTS: {
        const {
          ids,
          // filters
        } = action.payload;

        draft.filteredIds = ids;
        // draft.filters = { ...(filters || {}) };
        return;
      }
      case SET_FILTERS: {
        // sets new filter values, clears result ids (now stale)
        const { filters } = action.payload;
        draft.filters = { ...(filters || {}) };
        // draft.filteredIds = null; // NOTE this should cause selector to return null/undefined and show spinner in table
      }
    }
  });
