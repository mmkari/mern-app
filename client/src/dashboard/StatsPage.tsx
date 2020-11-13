import * as React from 'react';
import { connect } from 'react-redux';

import {
  // setActiveMovie,
  // getMovieRequest,
  getMoviesAggregateRatingGroupsRequest,
} from 'movie/actions';
import { getReviewsAggregateRatingGroupsRequest } from 'review/actions';

// import { getActiveMovie } from 'movie/selectors';

import styled from 'styled-components';
import { RootState, ThunkDispatch } from 'core/types';

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

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
// `;
const MoviePageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

type StatsRatingGroupsBarChartProps = {
  data: any;
};
const StatsRatingGroupsBarChart = ({
  data,
}: StatsRatingGroupsBarChartProps) => {
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

type StatsPageProps = {
  getMoviesAggregateRatingGroupsRequest: () => Promise<any>;
  getReviewAggregateRatings: () => Promise<any>;
};
const StatsPage = ({
  getMoviesAggregateRatingGroupsRequest,
  getReviewAggregateRatings,
}: StatsPageProps) => {
  const [ratingGroups, setRatingGroups] = React.useState(null);
  const [ratingGroups2, setRatingGroups2] = React.useState(null);

  React.useEffect(() => {
    getMoviesAggregateRatingGroupsRequest().then((agg) => {
      setRatingGroups(agg);
    });
    getReviewAggregateRatings().then((res) => {
      setRatingGroups2(res);
    });
  }, []); //

  if (!ratingGroups || !ratingGroups2) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stats</h1>
      <h2>Rating Groups</h2>
      <MoviePageContainer>
        <StatsRatingGroupsBarChart data={ratingGroups} />
      </MoviePageContainer>

      <h1>Stats</h1>
      <h2>Rating Groups per rating</h2>
      <MoviePageContainer>
        <StatsRatingGroupsBarChart data={ratingGroups2} />
      </MoviePageContainer>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  // activeMovie: getActiveMovie(state),
});
const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  // setActiveMovieRequest: (id) => dispatch(setActiveMovie(id)),
  // getMovieRequest: (id) => dispatch(getMovieRequest(id)),
  getMoviesAggregateRatingGroupsRequest: () =>
    dispatch(getMoviesAggregateRatingGroupsRequest()),
  getReviewAggregateRatings: () =>
    dispatch(getReviewsAggregateRatingGroupsRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
