import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import HelpBlock from './HelpBlock.jsx';

export default ({className, controlId, validationState, label, value, help, onChange, onBlur}) => {
  return (
    <Form.Group
      className={className}
      controlId={controlId}
      >
      <Form.Label>{label}</Form.Label>
      <div className='date-input-container'>
        <DatePicker
          id={controlId}
          className={`form-control ${validationState === 'valid' ? 'is-valid' : ''} ${validationState === 'invalid' ? 'is-invalid' : ''}`}
          selected={value || null}
          onChange={onChange}
          onBlur={onBlur}
          />
      </div>
      {/* have to add display: block here to deal with react-datepicker eccentricities */}
      <HelpBlock validationState={validationState} style={{display: 'block'}}>{help}</HelpBlock>
    </Form.Group>
  );
};
