import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

export default class SimpleModal extends Component {

  componentDidUpdate() {
    const button = ReactDOM.findDOMNode(this.closeButton);
    if (button) {
      button.focus();
    }
  }

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
          <Button onClick={onClose} ref={c => this.closeButton = c}>
            {buttonName || 'Okay'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
