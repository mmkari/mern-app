import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import RatingDisplay from 'react-verdict';

const ReviewList = styled.ul`
  // display: flex;
  // justify-content: space-around;

  // background: lightgray;
`;
const ReviewListItem = styled.li`
  display: flex;
  // justify-content: space-around;
  align-items: center

  &:nth-child(even) {
    background: lightgray;
  }
`;

const Review = ({ items }) => {
  return (
    <ReviewList>
      {items.map((i) => (
        <ReviewListItem>
          <RatingDisplay value={i.rating} />
          {i.text}
        </ReviewListItem>
      ))}
    </ReviewList>
  );
};

export default Review;
