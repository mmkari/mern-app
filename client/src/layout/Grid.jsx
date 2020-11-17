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

  @media (max-width: 1800px) {
    width: 25%;
  }

  @media (max-width: 1050px) {
    width: 33%;
  }

  @media (max-width: 800px) {
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
      {items.map((item, i) => {
        return (
          <GridContainerItem key={`grid-item-${i}`}>
            {render({ item })}
          </GridContainerItem>
        );
      })}
    </GridContainer>
  );
};

export default Grid;
