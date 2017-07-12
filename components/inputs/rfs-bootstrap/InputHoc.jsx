import React from 'react';


export default (Input) => {
  return ({className, required, formState, fieldState, ...other}) => {

    let validationState = null, help = null;

    if (fieldState.isMessageVisible() || !formState.showMessageOnBlur()) {
      if (fieldState.isValid()) {
        validationState = fieldState.get('warn') ? 'warning' : 'success';
      }
      if (fieldState.isValidating()) {validationState = 'warning';}
      if (fieldState.isInvalid()) {validationState = 'error';}

      help = fieldState.getMessage();
    }

    return (
      <Input
        className={`${className || ''} ${required ? 'required' : ''}`}
        fieldState={fieldState}
        validationState={validationState}
        help={help}
        {...other}
        />
    );
  };
};
