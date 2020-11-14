import * as React from 'react';
import styled from 'styled-components';
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

type ReviewProps = {
  items: { rating: number; text: string }[];
};
const Review = ({ items }: ReviewProps) => {
  return (
    <ReviewList>
      {items.map((i) => (
        <ReviewListItem key={`review-${i}`}>
          <RatingDisplay value={i.rating} />
          {i.text}
        </ReviewListItem>
      ))}
    </ReviewList>
  );
};

export default Review;
