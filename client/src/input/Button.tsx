import * as React from 'react';
import classnames from 'classnames';

import styled from 'styled-components';

import './Button.css';

type ButtonProps = {
  type?: string;
  className?: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode | string;
};
const Button = ({
  type,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
  label,
  children,
}: ButtonProps) => {
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
};

const StyledButton = styled(Button)`
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: red; //#ec7063;
    // background: gray;
  }
`;

export default StyledButton;
