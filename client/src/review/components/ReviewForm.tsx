import * as React from 'react';
import { StarPicker } from 'react-star-picker';

import TextInput from 'input/TextInput';
import Button from 'input/Button';
import { OnChangeFunction } from 'input/types';

type ReviewFormProps = {
  onChange: OnChangeFunction;
  values: { [key: string]: any };
  onSubmit: () => void;
};
const ReviewForm = ({ onChange, values, onSubmit }: ReviewFormProps) => {
  const onClick = () => {
    if (values.text && values.text.length > 0 && values.rating) {
      onSubmit();
    }
  };
  return (
    <div className="Form">
      {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
      <TextInput
        value={values ? values.text : ''}
        label="Text: "
        onChange={(val: any) => onChange('text', val)}
      />
      {/* <TagInput /> */}
      <StarPicker
        onChange={(value) => onChange('rating', value)}
        value={values.rating}
      />
      <Button onClick={onClick}>Add</Button>
    </div>
  );
};

export default ReviewForm;
