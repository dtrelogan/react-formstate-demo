import React from 'react';
import { FormGroup, Checkbox, HelpBlock } from 'react-bootstrap';

export default ({className, controlId, validationState, label, checked, onChange, onBlur, disabled, value, help}) => {
  return (
    <FormGroup
      className={className}
      controlId={controlId}
      validationState={validationState}
      >
      <Checkbox
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        >
        <span className='checkbox-label'>{label}</span>
      </Checkbox>
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
}
