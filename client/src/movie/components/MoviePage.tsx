import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  setActiveMovie,
  getMovieRequest,
  patchMovieRequest,
} from 'movie/actions';
import {
  getReviewsRequest,
  postReviewRequest,
  getReviewsAggregateAverageRatingByMovieRequest,
} from 'review/actions';

import { getActiveMovie } from 'movie/selectors';
import {
  getActiveMovieReviews,
  getAverageRatingsByMovieId,
} from 'review/selectors';

import StyledRatingDisplay from 'input/StyledRatingDisplay';
import styled from 'styled-components';
import TagDisplay from 'tag/components/TagDisplay';

import ReviewForm from 'review/components/ReviewForm';
import Reviews from 'review/components/Reviews';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { RootState, ThunkDispatch } from 'core/types';
import { OnChangeFunction } from 'input/types';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MoviePageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const getInitialValues = () => ({
  text: '',
  rating: null,
});

type MapDispatchToProps = {
  setActiveMovieRequest: (id: string | null) => Promise<any>;
  getMovieRequest: (id: string) => Promise<any>;
  getReviewsRequest: (query: Object) => Promise<any>;
  postReviewRequest: (data: Object) => Promise<any>;
  getAverageRatingsByMovie: (query: Object) => Promise<any>;
  patchMovieRequest: (id: string, data: Object) => Promise<any>;
};
type MapStateToProps = {
  activeMovie: null | any;
  activeMovieReviews: any;
  averageRatingsByMovieId: { [id: string]: number };
};
type MoviePageProps = MapDispatchToProps &
  MapStateToProps & {
    match: { params: { id: string } };
  };
const MoviePage = (props: any) => {
  const [values, setValues] = React.useState(getInitialValues());

  React.useEffect(() => {
    // dispatch current movie reset action
    props.setActiveMovieRequest(null);
    // get movie
    const id = props.match.params.id;
    props.getMovieRequest(id).then(() => {
      // add promise handling to update current movie ID
      props.setActiveMovieRequest(id);
      // query reviews for this movie
      const query = { movieId: id };
      props.getReviewsRequest(query);
      // get average rating for this movie
      props.getAverageRatingsByMovie(query);
    });
  }, []); //
  const {
    // name,
    activeMovie,
    activeMovieReviews,
    averageRatingsByMovieId,
  } = props;

  if (!activeMovie) {
    return <div>Loading...</div>;
  }

  const onChange: OnChangeFunction = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const query = { ...values, movieId: props.match.params.id };
    props.postReviewRequest(query);
  };

  // TODO use patchMovieRequest
  const updateRating = (id: string, rating: number) => {
    // this.props.patchMovieRequest(id, { rating });
  };

  const StatusIcon = activeMovie.fixed ? CheckIcon : ClearIcon;

  const avgRating = averageRatingsByMovieId
    ? averageRatingsByMovieId[props.match.params.id]
    : null;

  return (
    <div>
      <h1>{activeMovie.title}</h1>
      <MoviePageContainer>
        <Container>
          <label>RATING</label>
          <StyledRatingDisplay value={avgRating || 0} showRatingOnHover />

          <label>TAGS</label>
          {activeMovie.tags ? (
            <TagDisplay value={activeMovie.tags[0]} />
          ) : (
            'none'
          )}
        </Container>
        <Container>
          <label>FIXED</label>
          <div>{activeMovie.fixed ? 'yes' : 'no'}</div>
          <div>
            <StatusIcon />
          </div>
        </Container>
      </MoviePageContainer>
      <div>
        <h1>REVIEWS?</h1>
        <div>List reviews here</div>
        <ReviewForm onChange={onChange} values={values} onSubmit={onSubmit} />
        <Reviews items={activeMovieReviews} />
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState): MapStateToProps => ({
  activeMovie: getActiveMovie(state),
  activeMovieReviews: getActiveMovieReviews(state),
  averageRatingsByMovieId: getAverageRatingsByMovieId(state),
});
const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  setActiveMovieRequest: (id: string) => dispatch(setActiveMovie(id)),
  getMovieRequest: (id: string) => dispatch(getMovieRequest(id)),
  //
  getReviewsRequest: (query: any) => dispatch(getReviewsRequest(query)),
  postReviewRequest: (data: any) => dispatch(postReviewRequest(data)),
  //
  getAverageRatingsByMovie: (query: any) =>
    dispatch(getReviewsAggregateAverageRatingByMovieRequest(query)),
  patchMovieRequest: (id: string, data: any) =>
    dispatch(patchMovieRequest(id, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
