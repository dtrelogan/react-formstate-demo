import React from 'react';
import { Form } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

export default ({className, controlId, validationState, label, value, help, onChange, onBlur, rows, placeholder, disabled}) => {
  return (
    <Form.Group
      className={className}
      controlId={controlId}
      >
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control
        as='textarea'
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        isValid={validationState === 'valid'}
        isInvalid={validationState === 'invalid'}
        />
      <HelpBlock validationState={validationState}>{help}</HelpBlock>
    </Form.Group>
  );
};
