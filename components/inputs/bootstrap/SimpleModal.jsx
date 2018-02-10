import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

export default class SimpleModal extends Component {

  // The closeButton ref was undefined in componentDidUpdate after move to React 16.
  // This is the issue:
  // https://github.com/react-bootstrap/react-bootstrap/issues/2841
  // which forwards you to this issue:
  // https://github.com/react-bootstrap/react-overlays/pull/229
  // It looks like they merged the fix to react-overlays as of 11/28/2017 but it still hadn't been released as of 2/9/2018.
  // react-bootstrap 0.32.1 is dependent on the yet-unfixed react-overlays dependency... bummer...
  //
  // The autoFocus attribute is a workaround for this issue. Appears to work in React 16.
  //
  // // ref={c => this.closeButton = c}
  // componentDidUpdate() {
  //   const button = ReactDOM.findDOMNode(this.closeButton);
  //   if (button) {
  //     button.focus();
  //   }
  // }

  render() {
    const {title, show, onClose, buttonName, children} = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} autoFocus>
            {buttonName || 'Okay'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
