import React, { Component } from 'react';
import BootstrapSelect from '../bootstrap/Select.jsx';
import { computeClassName, computeValidationStateAndHelp } from  './_processProps.es6';

export const Select = (props) => {

  // using HOCs to compute these props
  //   className, help, validationState

  const {
    multiple,
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
    <BootstrapSelect
      multiple={multiple}
      className={className}
      controlId={fieldState.getKey()}
      label={label}
      value={fieldState.getValue()}
      help={help}
      validationState={validationState}
      onChange={e => handleValueChange(multiple ? BootstrapSelect.getSelectMultipleValue(e) : e.target.value)}
      onBlur={handleBlur}
      {...other}
      />
  );
};

export default computeValidationStateAndHelp(computeClassName(Select));
