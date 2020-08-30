import * as React from 'react';
import classnames from 'classnames';

import styled from 'styled-components';

import './Button.css';
class Button extends React.Component {
  render() {
    // use button element that allows inner html
    const {
      type,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      disabled,
      label,
      children,
    } = this.props;

    return (
      <button
        className={classnames('Button', type, className)}
        type="button"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
      >
        {label || children || ''}
      </button>
    );
  }
}

const StyledButton = styled(Button)`
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: red; //#ec7063;
    // background: gray;
  }
`;

export default StyledButton;
