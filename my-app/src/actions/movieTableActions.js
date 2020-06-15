export const SET_FILTERED_RESULTS = 'actions/MovieTable/SET_FILTERED_RESULTS';
export const SET_FILTERS = 'actions/MovieTable/SET_FILTERS';

export const setFilteredResults = (ids, filters) => {
  return {
    type: SET_FILTERED_RESULTS,
    payload: { ids, filters },
  };
};

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    payload: { filters },
  };
};
