import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default (props) => {
  return (
    <FormGroup
      className={props.className}
      controlId={props.controlId}
      validationState={props.validationState}
      >
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => props.handleValueChange(e.target.value)}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        />
      <FormControl.Feedback />
      <HelpBlock>{props.help}</HelpBlock>
    </FormGroup>
  );
};
