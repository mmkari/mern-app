import * as React from 'react'

class TextInput extends React.Component {
  onChange = (event) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(event.target.value)
    }
  }

  render() {
    return (
      <div>
        {this.props.label && <label>{this.props.label}</label>}
        <input type="text" value={this.props.value} onChange={this.onChange} />
        {this.props.error && <label>{this.props.error}</label>}
      </div>
    )
  }
}

export default TextInput
