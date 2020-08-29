import * as React from 'react';
import classnames from 'classnames';

import styled, { keyframes } from 'styled-components';

import './Button.css';
class Button extends React.Component {
  render() {
    // use button element that allows inner html
    return (
      <button
        className={classnames('Button', this.props.type, this.props.className)}
        type="button"
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        disabled={this.props.disabled}
      >
        {this.props.label || this.props.children || ''}
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
