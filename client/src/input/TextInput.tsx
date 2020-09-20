import * as React from 'react';

type TextInputProps = {
  label?: string;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
};
class TextInput extends React.Component<TextInputProps> {
  onChange = (event: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.value);
    }
  };

  render() {
    const { label, value, error } = this.props;

    return (
      <div>
        {label && <label>{label}</label>}
        <input type="text" value={value} onChange={this.onChange} />
        {error && <label>{error}</label>}
      </div>
    );
  }
}

export default TextInput;
