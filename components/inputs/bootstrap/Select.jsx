import React from 'react';
import { Form } from 'react-bootstrap';
import HelpBlock from './HelpBlock.jsx';

const Select = ({className, controlId, validationState, optionValues, multiple, label, value, help, onChange, onBlur, placeholder, size}) => {

  return (
    <Form.Group
      className={className}
      controlId={controlId}
      >
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control
        as="select"
        placeholder={placeholder}
        multiple={multiple}
        value={multiple ? (value || []) : value}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
        isValid={validationState === 'valid'}
        isInvalid={validationState === 'invalid'}
        >
        {optionValues.map((v) => <option key={v.id} value={v.id.toString()}>{v.name || v.text}</option>)}
      </Form.Control>
      <HelpBlock validationState={validationState}>{help}</HelpBlock>
    </Form.Group>
  );
};

Select.getSelectMultipleValue = (e) => {
  const value = [], options = e.target.options;
  for (let i = 0, len = options.length; i < len; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }
  return value;
}

export default Select;
