import * as React from 'react';
import Switch from '@material-ui/core/Switch';

type SwitchInputProps = {
  label?: string;
  value: string | number;
  checked: boolean;
  onChange: (value: string | number, checked: boolean) => void;
};
const SwitchInput = ({ label, value, checked, onChange }: SwitchInputProps) => {
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
