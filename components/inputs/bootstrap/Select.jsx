import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default ({className, controlId, validationState, optionValues, multiple, label, value, help, onChange, onBlur, placeholder}) => {

  return (
    <FormGroup
      className={className}
      controlId={controlId}
      validationState={validationState}
      >
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass="select"
        placeholder={placeholder}
        multiple={multiple}
        value={multiple ? (value || []) : value}
        onChange={onChange}
        onBlur={onBlur}
        >
        {optionValues.map((v) => <option key={v.id} value={v.id.toString()}>{v.name || v.text}</option>)}
      </FormControl>
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
};
