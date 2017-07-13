import React, { Component } from 'react';
import BootstrapCheckbox from '../bootstrap/Checkbox.jsx';

export default ({fieldState, handleValueChange, ...other}) => {
  return (
    <BootstrapCheckbox
      checked={fieldState.getValue()}
      onChange={e => handleValueChange(e.target.checked)}
      {...other}
      />
  );
};
