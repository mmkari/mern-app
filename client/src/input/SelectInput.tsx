import * as React from 'react';
import Select from 'react-select';

import { SelectOption } from 'input/types';

type SelectInputProps = {
  value: any;
  name?: string;
  onChange: (option: SelectOption, name?: string) => void;
  options: SelectOption[];
};
const SelectInput: React.FunctionComponent<SelectInputProps> = ({
  value,
  name,
  onChange: onChangeProp,
  options,
}) => {
  const onChange = (option: any) => {
    onChangeProp(option, name);
  };

  return <Select value={value} onChange={onChange} options={options} />;
};

export default SelectInput;
