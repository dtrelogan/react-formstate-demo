import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default ({className, controlId, validationState, label, value, help, onChange, onBlur, rows, placeholder, disabled}) => {
  return (
    <FormGroup
      className={className}
      controlId={controlId}
      validationState={validationState}
      >
      {label ? <ControlLabel>{label}</ControlLabel> : null}
      <FormControl
        componentClass='textarea'
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        />
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
};
