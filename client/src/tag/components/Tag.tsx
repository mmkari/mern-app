import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';

const TagRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;

  padding-right: 0;

  &:hover {
    color: red;
  }
`;

type TagProps = {
  value: string;
  onRemoveClick: () => void;
  className: string;
};
const Tag = ({ value, onRemoveClick, className }): React.ReactNode => {
  return (
    <div className={classnames('Tag', className)}>
      {value || '?'}{' '}
      {onRemoveClick && (
        <TagRemoveButton onClick={onRemoveClick}>
          <ClearIcon />
        </TagRemoveButton>
      )}
    </div>
  );
};

const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  background: lightgray;
  border-radius: 5px;

  padding: 2px 5px;
  //   align-items: center;
  //   justify-content: center;
`;

export default StyledTag;
