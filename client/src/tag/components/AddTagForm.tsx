import * as React from 'react';

import TextInput from 'input/TextInput';
// import NumberInput from './NumberInput';
// import SwitchInput from 'input/SwitchInput';
// import Button from './input/Button';

import { StarPicker } from 'react-star-picker';

// import SwitchButton from './SwitchButton';
import SwitchButton from 'react-switch-input';
import { OnChangeFunction } from 'input/types';
// import Tooltip from 'core/components/Tooltip';

type FormParentProps = {
  onChange: OnChangeFunction;
  values: any;
};
type FormParentState = {
  errors?: { title?: string; rating?: string };
};
class FormParent extends React.Component<FormParentProps, FormParentState> {
  // use hooks for inputs

  //   submit = () => {
  //     const { onSubmit } = this.props

  //     // validate before submit
  //     const errors = validate(this.state, exampleConstraints)
  //     console.log('The errors are', errors)
  //     this.setState({ errors })

  //     if ((!errors || isEmpty(errors)) && onSubmit) {
  //       onSubmit(this.state)
  //     }
  //   }

  render() {
    const { onChange, values } = this.props;
    const { errors } = this.state;

    return (
      <div className="Form">
        {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
        <label>Title: </label>
        <TextInput
          value={values ? values.title : ''}
          onChange={(val: any) => onChange('title', val)}
          error={errors?.title}
        />
        {/* <TagInput /> */}
        <StarPicker
          onChange={(value: any) => onChange('rating', value)}
          value={values.rating}
        />
        {errors?.rating && <label>{errors.rating}</label>}
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
      </div>
    );
  }
}

export default FormParent;
