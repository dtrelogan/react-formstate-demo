import React from 'react';
import { Form } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

export default ({className, controlId, validationState, type, label, value, help, onChange, onBlur, placeholder, disabled, autoFocus, autoComplete, showFeedback}) => {

  return (
    <Form.Group
      className={className}
      controlId={controlId}
      >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        isValid={validationState === 'valid'}
        isInvalid={validationState === 'invalid'}
        />
        {/* don't know how to hide red X on right side of input in react bootstrap 1... */}
        {/* {showFeedback === false ? null : <FormControl.Feedback />} */}
      <HelpBlock validationState={validationState}>{help}</HelpBlock>
    </Form.Group>
  );
};
