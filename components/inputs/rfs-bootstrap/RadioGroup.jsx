import React from 'react';
import RadioGroup from '../bootstrap/RadioGroup.jsx';

export default ({fieldState, handleValueChange, showValidationMessage, formState, ...other}) => {
  return (
    <RadioGroup
      controlId={fieldState.getKey()}
      value={fieldState.getValue()}
      onChange={e => handleValueChange(e.target.value)}
      help={fieldState.getMessage()}
      {...other}
      />
  );
};
