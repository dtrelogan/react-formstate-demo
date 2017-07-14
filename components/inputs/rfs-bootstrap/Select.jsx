import React, { Component } from 'react';
import BootstrapSelect from '../bootstrap/Select.jsx';
import processProps from  './_processProps.es6';

export default ({className, required, formState, fieldState, handleValueChange, showValidationMessage, multiple, ...other}) => {

  const {computedClassName, validationState, help, onBlur} = processProps({className, required, formState, fieldState, showValidationMessage});

  return (
    <BootstrapSelect
      className={computedClassName}
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={fieldState.getValue()}
      onChange={e => handleValueChange(multiple ? BootstrapSelect.getSelectMultipleValue(e) : e.target.value)}
      onBlur={onBlur}
      help={help}
      multiple={multiple}
      {...other}
      />
  );
}
