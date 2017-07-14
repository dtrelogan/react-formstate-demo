import React, { Component } from 'react';
import BootstrapCheckboxGroup from '../bootstrap/CheckboxGroup.jsx';
import processProps from  './_processProps.es6';

export default ({className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other}) => {

  const {computedClassName, validationState, help, onBlur} = processProps({className, required, formState, fieldState, showValidationMessage});

  const value = fieldState.getValue();

  return (
    <BootstrapCheckboxGroup
      className={computedClassName}
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={value}
      onChange={e => handleValueChange(BootstrapCheckboxGroup.getValue(value, e))}
      onBlur={onBlur}
      help={help}
      {...other}
      />
  );
};
