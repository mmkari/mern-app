import * as React from 'react';
import { connect } from 'react-redux';

import { setActiveMovie, getMovieRequest } from './actions/movieActions';
import { getReviewsRequest, postReviewRequest } from './actions/reviewActions';

import { getActiveMovie } from './selectors/movieSelectors';
import { getActiveMovieReviews } from './selectors/reviewSelectors';

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
    });
  }, []); //
  const { name, activeMovie, activeMovieReviews } = props;

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

  return (
    <div>
      <h1>{activeMovie.title}</h1>
      <MoviePageContainer>
        <Container>
          <label>RATING</label>
          <StyledRatingDisplay value={activeMovie.rating} showRatingOnHover />

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
});
const mapDispatchToProps = (dispatch) => ({
  setActiveMovieRequest: (id) => dispatch(setActiveMovie(id)),
  getMovieRequest: (id) => dispatch(getMovieRequest(id)),
  //
  getReviewsRequest: (query) => dispatch(getReviewsRequest(query)),
  postReviewRequest: (data) => dispatch(postReviewRequest(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
