import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

export default (props) => {
  return (
    <FormGroup
      className={props.className}
      controlId={props.controlId}
      validationState={props.validationState}
      >
      <ControlLabel>{props.label}</ControlLabel>
      <div className='date-input-container'>
        <DatePicker
          className='form-control'
          selected={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          />
      </div>
      <HelpBlock>{props.help}</HelpBlock>
    </FormGroup>
  );
};
