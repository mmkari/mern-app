import * as React from 'react';

import TextInput from './TextInput';

import SwitchInput from './SwitchInput';
import Button from './Button';
import TagSelect from './TagSelect';

import { StarPicker } from 'react-star-picker';

// import SwitchButton from './SwitchButton';
import SwitchButton from 'react-switch-input';

import Tooltip from './Tooltip';

const AddMovieDialogForm = (props) => {
  const { onChange, values } = props;

  return (
    <div className="Form">
      {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
      <TextInput
        value={values ? values.title : ''}
        label="Title: "
        onChange={(val) => onChange('title', val)}
      />
      {/* <TagInput /> */}
      <StarPicker
        onChange={(value) => onChange('rating', value)}
        value={values.rating}
      />
      <label>Fixed:</label>
      <SwitchButton
        checked={values.fixed}
        onChange={(value) => onChange('fixed', value)}
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
        onChange={(value) => {
          onChange('tagOption', value);
        }}
      />
    </div>
  );
};

export default AddMovieDialogForm;
