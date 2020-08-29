import * as React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import MovieTable from './MovieTable';
import AddMovieDialog from './AddMovieDialog';
import TagSelect from './TagSelect';
import Tag from './Tag';
import SelectInput from './SelectInput';
import SwitchButton from 'react-switch-input';

// import { SortDirection } from 'react-virtualized';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
  getMoviesRequest,
  deleteMovieRequest,
  postMovieRequest,
} from './actions/movieActions';
import { setFilters } from './actions/movieTableActions';

import { getReviewsAggregateAverageRatingByMovieRequest } from './actions/reviewActions';

import { getMovies } from './selectors/movieSelectors';
import {
  getMoviesFiltered,
  getFilters,
  getFilterTags,
} from './selectors/movieTableSelectors';
import { getAverageRatingsByMovieId } from './selectors/reviewSelectors';

import useContainerDimensions from './hooks';

const TableHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableFiltersItem = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    padding: 0 5px;
  }
`;

const ActiveTableFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const TagWithRemove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  // .Tag {
  //   border-top-right-radius: 0;
  //   border-bottom-right-radius: 0;
  // }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MovieContainer = ({ children }) => {
  const [ref, dimensions] = useContainerDimensions();

  if (typeof children === 'function') {
    return children({ ref, dimensions });
  }
};

const Sort = () => {
  //
  return <div>SORT COMP</div>;
};
const Count = ({ value }) => {
  //
  return (
    <div style={{ color: 'red', padding: '1em' }}>{`${value} RESULTS`}</div>
  );
};

const ratingFilterOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

class Movies extends React.Component {
  componentWillMount() {
    this.getMovies();
    // TODO get average reviews in saga
    this.props.getAverageRatingsByMovie();
  }

  onSubmit = (data) => {
    return this.props
      .postMovieRequest(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  };

  getMovies(query) {
    this.props.getMoviesRequest(query);
  }

  addTagFilter = (option) => {
    const { filters } = this.props;

    //TODO support tag array
    const updatedFilters = { ...filters, filterTag: option };
    this.props.setFilters(updatedFilters);
  };

  onStarFilterChange = (option, name) => {
    const { filters } = this.props;
    const { minRating: prevMinRating, maxRating: prevMaxRating } = filters;

    const updatedFilters = { ...filters, [name]: option };
    const { value } = option;
    if (name === 'minRating' && prevMaxRating && prevMaxRating.value < value) {
      updatedFilters.maxRating = undefined; // set to max
    } else if (
      name === 'maxRating' &&
      prevMinRating &&
      prevMinRating.value > value
    ) {
      updatedFilters.minRating = undefined; // set to min
    }

    this.props.setFilters(updatedFilters);
  };

  removeTagFilter = () => {
    // TODO handle tag array
    this.changeFilter('filterTag', undefined);
  };

  removeRating = (name) => {
    const { filters } = this.props;
    const { [name]: deleted, ...updatedFilters } = filters;

    this.props.setFilters(updatedFilters);
  };

  clearAllFilters = () => {
    this.props.setFilters({});
  };

  onSort = ({ sortBy, sortDirection }) => {
    const updatedFilters = { ...this.props.filters, sortBy, sortDirection };
    this.props.setFilters(updatedFilters);
  };

  render() {
    const { data, filters, filterTags, averageRatingsByMovieId } = this.props;
    const { filterTag, sortBy, sortDirection, minRating, maxRating } = filters;

    return (
      <MovieContainer>
        {({ ref, dimensions }) => (
          <div className="Movies" ref={ref}>
            <TableHeading>
              <h2>MAIN PAGE</h2>
              <AddMovieDialog onAccept={this.onSubmit} />
            </TableHeading>
            <TableFilters>
              <TableFiltersItem>
                <label>TAGS</label>
                <TagSelect
                  style={{ width: '150px' }}
                  value={filterTag}
                  onChange={this.addTagFilter}
                />
              </TableFiltersItem>
              <TableFiltersItem>
                <label>RATING</label>
                <label>min</label>
                <SelectInput
                  name="minRating"
                  value={minRating || null}
                  onChange={this.onStarFilterChange}
                  options={ratingFilterOptions}
                />
                <label>max</label>
                <SelectInput
                  name="maxRating"
                  value={maxRating || null}
                  onChange={this.onStarFilterChange}
                  options={ratingFilterOptions}
                />
              </TableFiltersItem>
            </TableFilters>
            <ActiveTableFilters>
              <FilterContainer>
                {filterTags.map((tag) => (
                  <TagWithRemove>
                    <Tag
                      value={tag.name}
                      onRemoveClick={this.removeTagFilter}
                    />
                    {/* <button onClick={this.removeTagFilter}>x</button> */}
                  </TagWithRemove>
                ))}
                {minRating && (
                  <TagWithRemove>
                    <Tag
                      value={`${String.fromCharCode(8805)} ${
                        minRating.label
                      } ${String.fromCharCode(9733)}`}
                      onRemoveClick={() => this.removeRating('minRating')}
                    />
                  </TagWithRemove>
                )}
                {maxRating && (
                  <TagWithRemove>
                    <Tag
                      value={`${String.fromCharCode(8804)} ${
                        maxRating.label
                      } ${String.fromCharCode(9733)}`}
                      onRemoveClick={() => this.removeRating('maxRating')}
                    />
                  </TagWithRemove>
                )}
                {(filterTags.length > 0 || minRating || maxRating) && (
                  <button onClick={this.clearAllFilters}>CLEAR FILTERS</button>
                )}
              </FilterContainer>
              <Toolbar>
                <Count value={this.props.movies.length} />
                <ListIcon />
                <SwitchButton
                  checked={false}
                  disabled
                  width={40}
                  buttonRadius={12}
                  buttonPinRadius={12}
                  buttonBorderWidth={2}
                />
                <ViewModuleIcon />
              </Toolbar>
              {/* <Sort /> */}
            </ActiveTableFilters>
            {/* TODO add option to switch between table and grid layout */}
            <MovieTable
              height={dimensions.height - 50}
              data={this.props.movies}
              deleteMovie={this.props.deleteMovieRequest}
              onSort={this.onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              averageRatingsByMovieId={averageRatingsByMovieId}
            />
          </div>
        )}
      </MovieContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  // movies: getMovies(state),
  movies: getMoviesFiltered(state),
  filters: getFilters(state),
  filterTags: getFilterTags(state),
  averageRatingsByMovieId: getAverageRatingsByMovieId(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesRequest: (query) => dispatch(getMoviesRequest(query)),
  deleteMovieRequest: (id) => dispatch(deleteMovieRequest(id)),
  postMovieRequest: (data) => dispatch(postMovieRequest(data)),
  //
  setFilters: (filters) => dispatch(setFilters(filters)),
  // ratings
  getAverageRatingsByMovie: () =>
    dispatch(getReviewsAggregateAverageRatingByMovieRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
