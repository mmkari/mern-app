import * as React from 'react';
import Grid from 'layout/Grid.jsx';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import RatingDisplay from 'react-verdict';
import styled from 'styled-components';
import { Movie as MovieType } from 'movie/types';

const MovieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 180px;
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

const ImagePlaceholder = styled.div.attrs({ className: 'ImagePlaceholder' })`
  margin: 1em;
  width: 100%;
  // height: 50px;
  padding-top: 100%;
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
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
          <ImagePlaceholder />
          <RatingDisplay value={item.averageRating || null} />
        </MovieItem>
      )}
    ></Grid>
  );
};

export default MovieGrid;
