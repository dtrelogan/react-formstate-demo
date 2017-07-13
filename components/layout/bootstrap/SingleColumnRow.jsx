import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default ({children}) => {
  return (
    <Row>
      <Col xs={12} sm={4} md={3} lg={2}>
        {children}
      </Col>
      <Col xsHidden sm={8} md={9} lg={10}/>
    </Row>
  );
};
