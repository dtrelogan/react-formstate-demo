import React from 'react';
import { Form } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

export default ({className, controlId, validationState, label, inline, buttonValues, value, help, onChange, onBlur, disabled}) => {

  let labelDiv = null;

  if (label) {
    labelDiv = (
      <div><Form.Label>{label}</Form.Label></div>
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
        <Form.Check
          type='radio'
          label={v.name || v.text}
          value={v.id}
          checked={value === v.id.toString()}
          onChange={onChange}
          inline={inline}
          disabled={disabled}
          isValid={validationState === 'valid'}
          isInvalid={validationState === 'invalid'}
          />
        {buttonSpacer}
      </span>
    );
  });

  return (
    <Form.Group
      className={className}
      controlId={controlId}
      onBlur={onBlur}
      >
      {labelDiv}
      {buttons}
      <HelpBlock validationState={validationState} style={{display: 'block'}}>{help}</HelpBlock>
    </Form.Group>
  );
}
