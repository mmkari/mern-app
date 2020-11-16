import * as React from 'react';
import styled from 'styled-components';

const GridContainer = styled.ul`
  // width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;
const GridContainerItem = styled.li`
  width: 25%;

  @media (max-width: 900px) {
    width: 25%;
  }

  @media (max-width: 768px) {
    width: 33%;
  }

  @media (max-width: 650px) {
    width: 50%;
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const Grid = ({ items, render }) => {
  //
  return (
    <GridContainer>
      {items.map((item) => {
        return <GridContainerItem>{render({ item })}</GridContainerItem>;
      })}
    </GridContainer>
  );
};

export default Grid;
