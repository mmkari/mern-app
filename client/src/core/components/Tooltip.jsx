import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Tooltip = ({ content, tooltip, show, className }) => {
  //

  return (
    <div>
      <div className={classnames('Tooltip-content', className)}>{content}</div>
      {show && <div className="Tooltip-tip">{tooltip}</div>}
    </div>
  );
};

const StyledTooltip = styled(Tooltip)`
  .Tooltip-tip {
    background: black;
    color: white;
  }
`;

export default StyledTooltip;
