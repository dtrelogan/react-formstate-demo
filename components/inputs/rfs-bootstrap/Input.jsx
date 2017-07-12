import React from 'react';
import BootstrapInput from '../bootstrap/Input.jsx';
import InputHoc from  './InputHoc.jsx';

const Input = ({fieldState, handleValueChange, showValidationMessage, validationState, help, ...other}) => {
  return (
    <BootstrapInput
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

export default InputHoc(Input);
