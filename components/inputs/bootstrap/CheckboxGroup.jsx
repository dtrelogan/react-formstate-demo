import React, { Component } from 'react';
import { FormGroup, Checkbox, HelpBlock, ControlLabel } from 'react-bootstrap';

const CheckboxGroup = ({className, controlId, validationState, label, checkboxValues, value, help, onChange, onBlur}) => {

  const checkboxes = checkboxValues.map((v) => {
    return (
      <Checkbox
        key={v.id}
        value={v.id}
        checked={(value || []).some(x => x === v.id.toString())}
        onChange={onChange}
        >
        {v.name}
      </Checkbox>
    );
  });

  return (
    <FormGroup className={className} controlId={controlId} validationState={validationState} onBlur={onBlur}>
      {label ? <ControlLabel>{label}</ControlLabel> : null}
      {checkboxes}
      <HelpBlock>{help}</HelpBlock>
    </FormGroup>
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
