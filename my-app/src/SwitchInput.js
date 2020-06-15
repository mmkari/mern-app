import * as React from 'react'
import Switch from '@material-ui/core/Switch'

const SwitchInput = props => {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <Switch
        value={props.value}
        checked={props.checked}
        onChange={event => {
          props.onChange(props.value, event.target.checked)
        }}
      />
    </div>
  )
}

export default SwitchInput
