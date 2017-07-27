import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default ({children}) => {
  return (
    <Row className='single-column-row'>
      <Col xs={12}>
        {children}
      </Col>
    </Row>
  );
};
