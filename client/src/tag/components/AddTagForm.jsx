import * as React from 'react';

import TextInput from '/input/TextInput';
// import NumberInput from './NumberInput';

// import SwitchInput from 'input/SwitchInput';
// import Button from './input/Button';

import { StarPicker } from 'react-star-picker';

// import SwitchButton from './SwitchButton';
import SwitchButton from 'react-switch-input';

// import Tooltip from 'core/components/Tooltip';

class FormParent extends React.Component {
  state = {};

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

    return (
      <div className="Form">
        {/* <Tooltip content="CONTENT" tooltip="TIP is here" show /> */}
        <TextInput
          value={values ? values.title : ''}
          label="Title: "
          onChange={(val) => onChange('title', val)}
          error={this.state.errors && this.state.errors.title}
        />
        {/* <TagInput /> */}
        <StarPicker
          onChange={(value) => onChange('rating', value)}
          value={values.rating}
        />
        {this.state.errors && this.state.errors.rating && (
          <label>{this.state.errors.rating}</label>
        )}
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
      </div>
    );
  }
}

export default FormParent;
