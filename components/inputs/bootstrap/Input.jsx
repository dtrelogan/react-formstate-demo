import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default (props) => {

  let feedback = props.showFeedback === false ? null : <FormControl.Feedback />;

  return (
    <FormGroup
      className={props.className}
      controlId={props.controlId}
      validationState={props.validationState}
      >
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        />
      {feedback}
      <HelpBlock>{props.help}</HelpBlock>
    </FormGroup>
  );
};
