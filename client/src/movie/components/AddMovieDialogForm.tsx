import * as React from 'react';
import styled from 'styled-components';
import TextInput from 'input/TextInput';

// import SwitchInput from 'input/SwitchInput';
// import Button from './input/Button';
import TagSelect from 'tag/components/TagSelect';

import SwitchButton from 'react-switch-input';
import { AddMovieDialogFormValues } from 'movie/types';

import { OnChangeFunction, SelectOption } from 'input/types';
// import Tooltip from 'core/components/Tooltip';

type RowColumnProps = {
  w?: number;
};
const Row = styled.div`
  display: flex;
`;
const RowColumn = styled.div.attrs({ className: 'RowColumn' })`
  display: flex;
  flex-direction: column;
  flex-grow: ${({ w }: RowColumnProps) => w || 1};
  // flex-basis: 0;

  & + & {
    margin-left: 1em;
  }
`;

type AddMovieDialogFormProps = {
  onChange: OnChangeFunction;
  values: AddMovieDialogFormValues;
};
const AddMovieDialogForm = ({ onChange, values }: AddMovieDialogFormProps) => {
  return (
    <div className="Form">
      {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
      <Row>
        <RowColumn w={2}>
          <label>Title:</label>
          <TextInput
            value={values ? values.title : ''}
            onChange={(val: string) => onChange('title', val)}
          />
        </RowColumn>
        {/* <TagInput /> */}
        <RowColumn>
          <label>Fixed:</label>
          <SwitchButton
            checked={values.fixed}
            onChange={(value: boolean) => onChange('fixed', value)}
            width={100}
            buttonRadius={28}
            buttonPinRadius={20}
            buttonBorderWidth={2}
          />
        </RowColumn>
      </Row>
      {/* <StarPicker
          onChange={(value) => onChange('halfRating', value)}
          value={this.state.halfRating}
          halfStars
        /> */}
      <Row>
        <RowColumn>
          <label>Tag:</label>
          <TagSelect
            value={values.tagOption}
            onChange={(value: SelectOption) => {
              onChange('tagOption', value);
            }}
          />
        </RowColumn>
      </Row>
    </div>
  );
};

export default AddMovieDialogForm;
