import React from 'react';
import { FormGroup, Radio, HelpBlock, ControlLabel } from 'react-bootstrap';

export default ({className, controlId, validationState, label, inline, buttonValues, value, help, onChange, onBlur, disabled}) => {

  let labelDiv = null;

  if (label) {
    labelDiv = (
      <div><ControlLabel>{label}</ControlLabel></div>
    );
  }

  let buttonSpacer = null;

  if (inline) {
    buttonSpacer = (
      <span>&nbsp;&nbsp;</span>
    );
  }

  const buttons = buttonValues.map((v) => {
    return (
      <span key={v.id}>
        <Radio
          value={v.id}
          checked={value === v.id.toString()}
          onChange={onChange}
          inline={inline}
          disabled={disabled}
          >
          {v.name || v.text}
        </Radio>
        {buttonSpacer}
      </span>
    );
  });

  return (
    <FormGroup className={className} controlId={controlId} validationState={validationState} onBlur={onBlur}>
      {labelDiv}
      {buttons}
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
}
