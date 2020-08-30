import * as React from 'react';
import { connect } from 'react-redux';

import {
  setActiveMovie,
  getMovieRequest,
  getMoviesAggregateRatingGroupsRequest,
} from 'movie/actions';
import { getActiveMovie } from 'movie/selectors';

import styled from 'styled-components';

// CHART
// import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  Legend,
} from 'recharts';
//

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MoviePageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StatsRatingGroupsBarChart = ({ data }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" type="number" domain={[1, 5]} interval={0} />
      <YAxis />
      {/* <Tooltip /> */}
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
};

const StatsPage = (props) => {
  const [ratingGroups, setRatingGroups] = React.useState(null);

  React.useEffect(() => {
    props.getMoviesAggregateRatingGroupsRequest().then((agg) => {
      setRatingGroups(agg);
    });
  }, []); //

  if (!ratingGroups) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stats</h1>
      <h2>Rating Groups</h2>
      <MoviePageContainer>
        <StatsRatingGroupsBarChart data={ratingGroups} />
      </MoviePageContainer>
    </div>
  );
};
const mapStateToProps = (state) => ({
  activeMovie: getActiveMovie(state),
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMovieRequest: (id) => dispatch(setActiveMovie(id)),
  getMovieRequest: (id) => dispatch(getMovieRequest(id)),
  getMoviesAggregateRatingGroupsRequest: () =>
    dispatch(getMoviesAggregateRatingGroupsRequest()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);
