import React from 'react';

export const computeClassName = (Input) => {
  return ({className, required, ...other}) => {
    const computedClassName = (
      `${className || ''} ${required ? 'required' : ''}`
    );
    return <Input className={computedClassName} required={required} {...other}/>;
  };
};


export const computeValidationStateAndHelp = (Input) => {
  return ({fieldState, showMessage, validationState, help, ...other}) => {

    let computedValidationState = null, computedHelp = null;

    if (showMessage) {
      if (fieldState.isValid()) {
        computedValidationState = fieldState.get('warn') ? 'warning' : 'success';
      }
      if (fieldState.isValidating()) {computedValidationState = 'warning';}
      if (fieldState.isInvalid()) {computedValidationState = 'error';}

      computedHelp = fieldState.getMessage();
    }

    const props = {
      fieldState,
      showMessage,
      validationState: validationState !== undefined ? validationState : computedValidationState,
      help: help !== undefined ? help : computedHelp,
      ...other
    };

    return <Input {...props}/>;
  };
};
