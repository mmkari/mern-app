import * as React from 'react';
import { StarPicker } from 'react-star-picker';
import classnames from 'classnames';
import styled from 'styled-components';
import TextInput from 'input/TextInput';
import Button from 'input/Button';
import { OnChangeFunction } from 'input/types';

type ReviewFormProps = {
  onChange: OnChangeFunction;
  values: { [key: string]: any };
  onSubmit: () => void;
  className?: string;
};
const ReviewForm = ({
  onChange,
  values,
  onSubmit,
  className,
}: ReviewFormProps) => {
  const onClick = () => {
    if (values.text && values.text.length > 0 && values.rating) {
      onSubmit();
    }
  };
  return (
    <div className={classnames('Form', className)} style={{ width: '200px' }}>
      {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
      <label>Text: </label>
      <TextInput
        value={values ? values.text : ''}
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

const StyledReviewForm = styled(ReviewForm)`
  margin: auto;
`;

export default StyledReviewForm;
