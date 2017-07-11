import React, { Component } from 'react';
import BootstrapInput from './Input.jsx';

export default ({className, required, fieldState, handleValueChange, showValidationMessage, formState, ...other}) => {

  let validationState = null;
  if (fieldState.isValid()) {
    validationState = fieldState.get('warn') ? 'warning' : 'success';
  }
  if (fieldState.isValidating()) {validationState = 'warning';}
  if (fieldState.isInvalid()) {validationState = 'error';}

  return (
    <BootstrapInput
      className={`${className || ''} ${required ? 'required' : ''}`}
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={fieldState.getValue()}
      handleValueChange={handleValueChange}
      help={fieldState.getMessage()}
      {...other}
      />
  );
};
