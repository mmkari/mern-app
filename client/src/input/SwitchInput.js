import * as React from 'react';
import Switch from '@material-ui/core/Switch';

const SwitchInput = ({ label, value, checked, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <Switch
        value={value}
        checked={checked}
        onChange={(event) => {
          onChange(value, event.target.checked);
        }}
      />
    </div>
  );
};

export default SwitchInput;
