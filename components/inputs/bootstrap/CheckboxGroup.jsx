import React, { Component } from 'react';
import { Form  } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

const CheckboxGroup = ({className, controlId, validationState, label, checkboxValues, value, help, onChange, onBlur}) => {

  const checkboxes = checkboxValues.map((v) => {
    return (
      <Form.Check
        type='checkbox'
        label={v.name}
        key={v.id}
        value={v.id}
        checked={(value || []).some(x => x === v.id.toString())}
        onChange={onChange}
        isValid={validationState === 'valid'}
        isInvalid={validationState === 'invalid'}
        />
    );
  });

  return (
    <Form.Group className={className} controlId={controlId} onBlur={onBlur}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      {checkboxes}
      <HelpBlock validationState={validationState} style={{display: 'block'}}>{help}</HelpBlock>
    </Form.Group>
  );
}

CheckboxGroup.getValue = (prevValue, e) => {
  if (!prevValue) {prevValue = [];}

  if (!e.target.checked) {
    return prevValue.filter(x => x !== e.target.value);
  }

  const value = prevValue.slice(0); // copy the existing array
  if (!value.some(x => x === e.target.value)) {
    value.push(e.target.value)
    value.sort();
  }
  return value;
}

export default CheckboxGroup;
