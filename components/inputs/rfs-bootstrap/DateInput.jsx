import React, { Component } from 'react';
import BootstrapDateInput from '../bootstrap/DateInput.jsx';
import { computeClassName, computeValidationStateAndHelp } from  './_processProps.es6';

const DateInput = (props) => {

  // using HOCs to compute these props
  //   className, help, validationState

  const {
    className,
    label,
    help,
    validationState,
    formState, // consume
    fieldState, // consume
    handleValueChange, // consume
    handleBlur, // consume
    required, // consume
    showMessage, // consume
    ...other
  } = props;

  return (
    <BootstrapDateInput
      className={className}
      controlId={fieldState.getKey()}
      label={label}
      value={fieldState.getValue()}
      help={help}
      validationState={validationState}
      onChange={handleValueChange}
      onBlur={handleBlur}
      {...other}
      />
  );
};

const DecoratedDateInput = computeValidationStateAndHelp(computeClassName(DateInput));
DecoratedDateInput.rfsNoCoercion = true; // <---- set it ONCE
export default DecoratedDateInput;
