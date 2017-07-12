import React from 'react';
import { FormGroup, Radio, HelpBlock, ControlLabel } from 'react-bootstrap';

export default ({controlId, label, inline, buttonValues, value, help, onChange, disabled}) => {

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
          {v.text}
        </Radio>
        {buttonSpacer}
      </span>
    );
  });

  return (
    <FormGroup controlId={controlId}>
      {labelDiv}
      {buttons}
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
  );
}
