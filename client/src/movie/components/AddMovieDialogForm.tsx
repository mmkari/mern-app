import * as React from 'react';

import TextInput from 'input/TextInput';

// import SwitchInput from 'input/SwitchInput';
// import Button from './input/Button';
import TagSelect from 'tag/components/TagSelect';

import SwitchButton from 'react-switch-input';
import { AddMovieDialogFormValues } from 'movie/types';

// import Tooltip from 'core/components/Tooltip';

type AddMovieDialogFormProps = {
  onChange: (name: string, value: string | number | boolean | Object) => void;
  values: AddMovieDialogFormValues;
};
const AddMovieDialogForm = ({ onChange, values }: AddMovieDialogFormProps) => {
  return (
    <div className="Form">
      {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
      <TextInput
        value={values ? values.title : ''}
        label="Title: "
        onChange={(val: string) => onChange('title', val)}
      />
      {/* <TagInput /> */}
      <label>Fixed:</label>
      <SwitchButton
        checked={values.fixed}
        onChange={(value: boolean) => onChange('fixed', value)}
        width={190}
        buttonRadius={48}
        buttonPinRadius={40}
        buttonBorderWidth={2}
      />
      {/* <StarPicker
          onChange={(value) => onChange('halfRating', value)}
          value={this.state.halfRating}
          halfStars
        /> */}
      <TagSelect
        value={values.tagOption}
        onChange={(value: Object) => {
          onChange('tagOption', value);
        }}
      />
    </div>
  );
};

export default AddMovieDialogForm;
