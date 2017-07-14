import React, { Component } from 'react';
import BootstrapValidatedCheckbox from '../bootstrap/ValidatedCheckbox.jsx';
import processProps from  './_processProps.es6';

export default ({className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other}) => {

  const {computedClassName, validationState, help, onBlur} = processProps({className, required, formState, fieldState, showValidationMessage});

  return (
    <BootstrapValidatedCheckbox
      className={computedClassName}
      controlId={fieldState.getKey()}
      validationState={validationState}
      checked={fieldState.getValue()}
      onChange={e => handleValueChange(e.target.checked)}
      onBlur={onBlur}
      help={help}
      {...other}
      />
  );
}
