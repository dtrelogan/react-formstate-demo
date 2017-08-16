import React, { Component } from 'react';
import BootstrapValidatedCheckbox from '../bootstrap/ValidatedCheckbox.jsx';
import { computeClassName, computeValidationStateAndHelp } from  './_processProps.es6';

export const ValidatedCheckbox = (props) => {

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
    <BootstrapValidatedCheckbox
      className={className}
      controlId={fieldState.getKey()}
      label={label}
      checked={fieldState.getValue()}
      help={help}
      validationState={validationState}
      onChange={e => handleValueChange(e.target.checked)}
      onBlur={handleBlur}
      {...other}
      />
  );
}

export default computeValidationStateAndHelp(computeClassName(ValidatedCheckbox));
