import React, { Component } from 'react';
import BootstrapCheckboxGroup from '../bootstrap/CheckboxGroup.jsx';
import { computeClassName, computeValidationStateAndHelp } from  './_processProps.es6';

export const CheckboxGroup = (props) => {

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
    <BootstrapCheckboxGroup
      className={className}
      controlId={fieldState.getKey()}
      label={label}
      value={fieldState.getValue()}
      help={help}
      validationState={validationState}
      onChange={e => handleValueChange(BootstrapCheckboxGroup.getValue(fieldState.getValue(), e))}
      onBlur={handleBlur}
      {...other}
      />
  );
};

export default computeValidationStateAndHelp(computeClassName(CheckboxGroup));
