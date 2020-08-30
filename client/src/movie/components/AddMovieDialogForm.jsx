import * as React from 'react';

import TextInput from 'input/TextInput';

// import SwitchInput from 'input/SwitchInput';
// import Button from './input/Button';
import TagSelect from 'tag/components/TagSelect';

import SwitchButton from 'react-switch-input';

// import Tooltip from 'core/components/Tooltip';

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