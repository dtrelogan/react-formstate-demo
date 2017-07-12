import React, { Component } from 'react';
import BootstrapInput from '../bootstrap/DateInput.jsx';
import InputHoc from  './InputHoc.jsx';

const DateInput = ({fieldState, handleValueChange, showValidationMessage, validationState, help, ...other}) => {

  return (
    <BootstrapInput
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={fieldState.getValue()}
      onChange={handleValueChange}
      onBlur={showValidationMessage}
      help={help}
      {...other}
      />
  );
};

const DateInputHoc = InputHoc(DateInput);

DateInputHoc.rfsNoCoercion = true; // <---- set it ONCE

export default DateInputHoc;
