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


const testModel = {
  id: 123,
  name: 'Travel to Europe (I wish!)',
  startDate: '2019-07-12T18:32:24.402Z',
  endDate: '2019-07-26T18:32:24.402Z'
};


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
      this.formState.injectField(this.state, 'startDate', moment(props.model.startDate), true);
      this.formState.injectField(this.state, 'endDate', moment(props.model.endDate), true);
    }
  }

  editMode() {
    return Boolean(this.props.model);
  }

  validateEndDate(v, context) {
    if (!v) { return 'End Date is required'; }
    if (v <= context.getu('startDate')) {
      return 'End Date must be after Start Date';
    }
  }

  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row>
            <HiddenInput
              formField='id'
              defaultValue='0'
              intConvert
              />
          </Row>
          <Row>
            <Input
              formField='name'
              label='Event Name'
              required
              autoComplete='off'
              />
          </Row>
          <Row>
            <DateInput
              formField='startDate'
              label='Start Date'
              required='-'
              fsv={v => v.rdpRequired()}
              handleValueChange={v => this.handleStartDateChange(v)}
              />
          </Row>
          <Row>
            <DateInput
              formField='endDate'
              label='End Date'
              required='-'
              />
          </Row>
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
            <ListGroupItem>
              startDate &lt; endDate validation takes place against endDate. If startDate changes, the validation status of endDate gets reset, and, if empty, initialized
              to startDate. (This is very similar to resetting password confirmation when password changes. It is a handy pattern.)
            </ListGroupItem>
            <ListGroupItem>
              react-datepicker is not designed to work as a controlled component and runs into issues with being controlled by form state if you manually wipe the input box.
            </ListGroupItem>
          </ListGroup>
        </Instructions>
      </Form>
    );
  }

  handleStartDateChange(v) {
    const context = this.formState.createUnitOfWork();
    context.set('startDate', v).validate();
    // reset endDate's validation status. if empty initialize it to startDate.
    const endDate = context.getu('endDate');
    context.set('endDate', endDate ? endDate : v);
    context.updateFormState();
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


const Hoc = ShowModel(EventForm);
Hoc.testModel = testModel;
export default Hoc;
