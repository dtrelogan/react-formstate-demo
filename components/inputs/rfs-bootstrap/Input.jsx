import React from 'react';
import BootstrapInput from '../bootstrap/Input.jsx';
import processProps from  './_processProps.es6';

export default ({className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other}) => {

  const {computedClassName, validationState, help} = processProps({className, required, formState, fieldState});

  return (
    <BootstrapInput
      className={computedClassName}
      controlId={fieldState.getKey()}
      validationState={validationState}
      value={fieldState.getValue()}
      onChange={e => handleValueChange(e.target.value)}
      onBlur={showValidationMessage}
      help={help}
      {...other}
      />
  );
};
