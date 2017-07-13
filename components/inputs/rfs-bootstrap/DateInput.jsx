import React, { Component } from 'react';
import BootstrapDateInput from '../bootstrap/DateInput.jsx';
import processProps from  './_processProps.es6';

const DateInput = ({className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other}) => {

  const {computedClassName, validationState, help} = processProps({className, required, formState, fieldState});

  return (
    <BootstrapDateInput
      className={computedClassName}
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

DateInput.rfsNoCoercion = true; // <---- set it ONCE

export default DateInput;
