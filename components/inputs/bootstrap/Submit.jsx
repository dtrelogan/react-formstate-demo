import React from 'react';
import { Button } from 'react-bootstrap';

export default ({bsStyle, bsSize, message, invalid, validating, uploading, disabled, grabRef}) => {

  let computedBsStyle = 'primary', computedMessage = 'Submit';

  if (invalid) {computedBsStyle = 'danger'; computedMessage = 'Please fix validation errors';}
  if (validating) {computedBsStyle = 'warning'; computedMessage = 'Waiting for validation...';}
  if (uploading) {computedBsStyle = 'warning'; computedMessage = 'Waiting for upload...';}

  if (bsStyle) {computedBsStyle = bsStyle;}
  if (message) {computedMessage = message;}

  return (
    <div>
      <Button
        type='submit'
        bsStyle={computedBsStyle}
        disabled={invalid || validating || uploading || disabled}
        bsSize={bsSize}
        ref={grabRef}
        >
        {computedMessage}
      </Button>
    </div>
  );
};