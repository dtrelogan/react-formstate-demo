import React, { Component } from 'react';
import { FormExtension } from 'react-formstate';
import { Row, Col } from 'react-bootstrap';
import Input from './inputs/rfs-bootstrap/Input.jsx';

export default class Address extends React.Component {

  render() {
    let disabled = this.props.disabled;

    let dv = this.props.defaultValue || {line1:'',line2:'',line3:'',city:'',state:'',zip:'',country:''};

    return (
      <FormExtension nestedForm={this}>
        <Row>
          <Col xs={6} sm={3} lg={2}><Input formField='line1' label='Line 1' required defaultValue={dv.line1} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}><Input formField='line2' label='Line 2' defaultValue={dv.line2} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}><Input formField='line3' label='Line 3' defaultValue={dv.line3} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}></Col>
          <Col xsHidden lg={4}/>
        </Row>
        <Row>
          <Col xs={6} sm={3} lg={2}><Input formField='city' label='City' required defaultValue={dv.city} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}><Input formField='state' label='State' required defaultValue={dv.state} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}><Input formField='zip' label='Zip' required defaultValue={dv.zip} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}><Input formField='country' label='Country' required defaultValue={dv.country} disabled={disabled} /></Col>
          <Col xs={6} sm={3} lg={2}></Col>
          <Col xsHidden lg={4}/>
        </Row>
      </FormExtension>
    );
  }
};
