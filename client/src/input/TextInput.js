import * as React from 'react';

class TextInput extends React.Component {
  onChange = (event) => {
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
