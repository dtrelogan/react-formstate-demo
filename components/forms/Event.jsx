import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import Row from '../layout/bootstrap/SingleColumnRow.jsx';
import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import Input from '../inputs/rfs-bootstrap/Input.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';
import ShowModel from './ShowModelHoc.jsx';
import Instructions from './Instructions.jsx';
import DateInput from '../inputs/rfs-bootstrap/DateInput.jsx';
import moment from 'moment';


//
//
// Register a reusable validation that works for react-datepicker
//
//
FormState.registerValidation('rdpRequired', function(value, label) {
  if (!value) { return `${label} is required`; }
});


class EventForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);

    if (props.model) {
      // have to "reverse coerce" the string to a moment to work with react-datepicker
      // passing 'true' prevents flattening the 'moment' object into form state.
      this.formState.add(this.state, 'from', moment(props.model.from), true);
      this.formState.add(this.state, 'to', moment(props.model.to), true);
    }
  }

  editMode() {
    return Boolean(this.props.model);
  }

  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row><HiddenInput formField='id' defaultValue='0' intConvert/></Row>
          <Row><Input formField='name' label='Event Name' required autoComplete='off'/></Row>
          <Row><DateInput formField='from' label='Start Date' required='-' fsv={v => v.rdpRequired()}/></Row>
          <Row><DateInput formField='to' label='End Date' required='-' fsv={v => v.rdpRequired()}/></Row>
          <Row>
            <Submit
              className='submit'
              invalid={this.formState.isInvalid()}
              validating={this.formState.isValidating()}
              grabRef={c => this.submitButton = c}
              />
          </Row>
        </Grid>
        <Instructions>
          <h3>Notes</h3>
          <ListGroup>
            <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Event.jsx'>source code</a></ListGroupItem>
            <ListGroupItem>Unlike a standard HTML input that works with string values, react-datepicker is a nonstandard input that works with {'"moment"'} objects.</ListGroupItem>
          </ListGroup>
        </Instructions>
      </Form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    ReactDOM.findDOMNode(this.submitButton).focus();
    const model = this.formState.createUnitOfWork().createModel();
    if (model) {
      this.props.showModel(model);
    }
  }
}


export default ShowModel(EventForm);
