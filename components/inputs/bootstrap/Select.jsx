import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const Select = ({className, controlId, validationState, optionValues, multiple, label, value, help, onChange, onBlur, placeholder, size}) => {

  return (
    <FormGroup
      className={className}
      controlId={controlId}
      validationState={validationState}
      >
      {label ? <ControlLabel>{label}</ControlLabel> : null}
      <FormControl
        componentClass="select"
        placeholder={placeholder}
        multiple={multiple}
        value={multiple ? (value || []) : value}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
        >
        {optionValues.map((v) => <option key={v.id} value={v.id.toString()}>{v.name || v.text}</option>)}
      </FormControl>
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
};

Select.getSelectMultipleValue = (e) => {
  const value = [], options = e.target.options;
  for (let i = 0, len = options.length; i < len; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }
  return value;
}

export default Select;
