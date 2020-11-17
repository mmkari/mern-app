import * as React from 'react';
import Grid from 'layout/Grid.jsx';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import RatingDisplay from 'react-verdict';
import styled from 'styled-components';
import { Movie as MovieType } from 'movie/types';

const MovieItem = styled.div`
  margin: 1em;
  padding: 2em 1em;
  transition: background-color 0.4s;
  // background-color: #eeeeee;
  border: 1px solid lightgray;
  :hover {
    background-color: lightgray;

    // img {
    //   transform: scale(1.2);
    // }
  }

  a {
    color: gray;
  }
`;

type MovieGridTypes = {
  data: null | MovieType[];
};
const MovieGrid = ({ data }: MovieGridTypes) => {
  return (
    <Grid
      items={data}
      render={({ item }: { item: any }) => (
        <MovieItem>
          <Link to={`/item/${item.id}`}>{item.title}</Link>
          <RatingDisplay value={item.averageRating || null} />
        </MovieItem>
      )}
    ></Grid>
  );
};

export default MovieGrid;
