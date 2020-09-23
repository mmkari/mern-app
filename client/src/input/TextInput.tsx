import * as React from 'react';
import styled from 'styled-components';

type TextInputProps = {
  // label?: string;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
};
class TextInput extends React.Component<TextInputProps> {
  onChange = (event: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.value);
    }
  };

  render() {
    const { value, error, className } = this.props;

    return (
      <div className={className}>
        {/* {label && <label>{label}</label>} */}
        <input type="text" value={value} onChange={this.onChange} />
        {error && <label>{error}</label>}
      </div>
    );
  }
}

const StyledTextInput = styled(TextInput)`
  input {
    width: 100%;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    min-height: 38px;
    outline: 0 !important;
    position: relative;
    transition: all 100ms;
    box-sizing: border-box;

    &:active,
    &:focus {
      border-color: #2684ff;
      box-shadow: 0 0 0 1px #2684ff;
    }
  }
`;

export default StyledTextInput;
export { TextInput };
