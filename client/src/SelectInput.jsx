import * as React from 'react';
import Select from 'react-select';

const SelectInput = ({ value, name, onChange: onChangeProp, options }) => {
  const onChange = (option) => {
    onChangeProp(option, name);
  };

  return <Select value={value} onChange={onChange} options={options} />;
};

export default SelectInput;
