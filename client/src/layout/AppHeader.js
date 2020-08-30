import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const AppHeader = ({ height, className }) => {
  //
  return (
    <div className={classnames('App-header', className)}>
      <Link className="AppHeader-linkHome" to={'/'}>
        ABCD...
      </Link>
    </div>
  );
};

const StyledHeader = styled(AppHeader)`
  height: ${({ height }) => `${height}`}px;
`;

export default StyledHeader;
