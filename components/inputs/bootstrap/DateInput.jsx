import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

export default ({className, controlId, validationState, label, value, help, onChange, onBlur}) => {
  return (
    <FormGroup
      className={className}
      controlId={controlId}
      validationState={validationState}
      >
      <ControlLabel>{label}</ControlLabel>
      <div className='date-input-container'>
        <DatePicker
          className='form-control'
          selected={value || null}
          onChange={onChange}
          onBlur={onBlur}
          />
      </div>
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
};
