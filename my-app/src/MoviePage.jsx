import * as React from 'react';
import { connect } from 'react-redux';

import { setActiveMovie, getMovieRequest } from './actions/movieActions';
import {
  getReviewsRequest,
  postReviewRequest,
  getReviewsAggregateAverageRatingByMovieRequest,
} from './actions/reviewActions';

import { getActiveMovie } from './selectors/movieSelectors';
import {
  getActiveMovieReviews,
  getAverageRatingsByMovieId,
} from './selectors/reviewSelectors';

import StyledRatingDisplay from './StyledRatingDisplay';
import styled, { keyframes } from 'styled-components';
import TagDisplay from './TagDisplay';

import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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

const MoviePage = (props) => {
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
    name,
    activeMovie,
    activeMovieReviews,
    averageRatingsByMovieId,
  } = props;

  if (!activeMovie) {
    return <div>Loading...</div>;
  }

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const query = { ...values, movieId: props.match.params.id };
    props.postReviewRequest(query);
  };

  const StatusIcon = activeMovie.fixed ? CheckIcon : ClearIcon;

  const avgRating = averageRatingsByMovieId
    ? averageRatingsByMovieId[props.match.params.id]
    : null;

  return (
    <div>
      The aggreagates in main table need to be stored in DB as sorting requires
      them to be available for EVERY movie -> need to use cached ratings in
      table view that are re-calculated periodically (e.g. at 23:59, or manually
      from admin tools)
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
const mapStateToProps = (state) => ({
  activeMovie: getActiveMovie(state),
  activeMovieReviews: getActiveMovieReviews(state),
  averageRatingsByMovieId: getAverageRatingsByMovieId(state),
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMovieRequest: (id) => dispatch(setActiveMovie(id)),
  getMovieRequest: (id) => dispatch(getMovieRequest(id)),
  //
  getReviewsRequest: (query) => dispatch(getReviewsRequest(query)),
  postReviewRequest: (data) => dispatch(postReviewRequest(data)),
  //
  getAverageRatingsByMovie: (query) =>
    dispatch(getReviewsAggregateAverageRatingByMovieRequest(query)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
