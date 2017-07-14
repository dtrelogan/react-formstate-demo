import React, { Component } from 'react';
import BootstrapTextArea from '../bootstrap/TextArea.jsx';
import processProps from  './_processProps.es6';

export default ({className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other}) => {

  const {computedClassName, validationState, help, onBlur} = processProps({className, required, formState, fieldState, showValidationMessage});

  return (
    <BootstrapTextArea
      className={computedClassName}
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={fieldState.getValue()}
      onChange={e => handleValueChange(e.target.value)}
      onBlur={onBlur}
      help={help}
      {...other}
      />
  );
};
