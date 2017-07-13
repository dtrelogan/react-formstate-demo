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



class EventForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);

    if (props.model) {
      // have to "reverse coerce" the string to a moment to work with react-datepicker
      // passing 'true' prevents flattening the 'moment' object into form state.
      this.formState.add(this.state, 'startDate', moment(props.model.startDate), true);
      this.formState.add(this.state, 'endDate', moment(props.model.endDate), true);
    }

    this.validateDates = this.validateDates.bind(this);
  }

  editMode() {
    return Boolean(this.props.model);
  }

  validateDates(v, context, field) {
    if (!v) { return `${field.label} is required`; }

    const start = context.getFieldState('startDate');
    const end = context.getFieldState('endDate');

    if (!start.getUncoercedValue() || !end.getUncoercedValue()) { return; }

    if (start.getUncoercedValue() >= end.getUncoercedValue()) {
      start.setInvalid('Start Date must be before End Date');
      end.setInvalid('End Date must be after Start Date');
    } else {
      start.setValid();
      end.setValid();
    }
  }

  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row><HiddenInput formField='id' defaultValue='0' intConvert/></Row>
          <Row><Input formField='name' label='Event Name' required autoComplete='off'/></Row>
          <Row><DateInput formField='startDate' label='Start Date' required='-' validate={this.validateDates}/></Row>
          <Row><DateInput formField='endDate' label='End Date' required='-' validate={this.validateDates}/></Row>
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
          <ListGroup>
            <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Event.jsx'>source code</a></ListGroupItem>
            <ListGroupItem>Unlike a standard HTML input that works with string values, react-datepicker is a nonstandard input that works with {'"moment"'} objects.</ListGroupItem>
            <ListGroupItem>Validating that start date is before end date onChange is not as clean as validating at time of render, but it&apos;s doable.</ListGroupItem>
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
