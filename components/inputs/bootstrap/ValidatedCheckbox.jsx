import React from 'react';
import { Form } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

export default ({className, controlId, validationState, label, checked, onChange, onBlur, disabled, value, help}) => {
  return (
    <Form.Group
      className={className}
      controlId={controlId}
      >
      <Form.Check
        type='checkbox'
        label={label}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        isValid={validationState === 'valid'}
        isInvalid={validationState === 'invalid'}
        />
      <HelpBlock validationState={validationState} style={{display: 'block'}}>{help}</HelpBlock>
    </Form.Group>
  );
}
