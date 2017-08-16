import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ShowModel from '../parts/ShowModelHoc.jsx';
import { FormStateDisplay, addCurrentModelToUpdates } from '../parts/FormStateDisplay.jsx';
import Instructions from '../parts/Instructions.jsx';

import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import Input from '../inputs/rfs-bootstrap/Input.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';
import DateInput from '../inputs/rfs-bootstrap/DateInput.jsx';
import moment from 'moment';


const testModel = {
  id: 123,
  name: 'Travel to Europe (I wish!)',
  startDate: '2019-07-12T18:32:24.402Z',
  endDate: '2019-07-26T18:32:24.402Z'
};


class EventForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this, () => this.state, this.updateState.bind(this));
    this.state = {};
  }

  updateState(updates) {
    this.setState(addCurrentModelToUpdates(this.formState, updates));
  }

  componentDidMount() {
    const context = this.formState.createUnitOfWork();
    context.injectModel(this.props.model);
    if (this.props.model) {
      // have to "reverse coerce" the string to a moment to work with react-datepicker
      // passing 'true' prevents flattening the 'moment' object into form state.
      context.injectField('startDate', moment(this.props.model.startDate), true);
      context.injectField('endDate', moment(this.props.model.endDate), true);
    }
    context.updateFormState();
  }

  editMode() {
    return Boolean(this.props.model);
  }

  validateEndDate(v, context) {
    // Cannot do fsv prop AND a regular validation block, only one or the other.
    if (!vlib.exists(v)) { return 'End Date is required'; }
    if (v <= context.getu('startDate')) {
      return 'End Date must be after Start Date';
    }
  }

  render() {
    const instructions = (
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
    );

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.state}>
          <HiddenInput
            formField='id'
            defaultValue='0'
            intConvert
            />
          <Input
            formField='name'
            label='Event Name'
            required
            autoComplete='off'
            />
          <DateInput
            formField='startDate'
            label='Start Date'
            required='-'
            fsv={v => v.exists().msg('Start Date is required')}
            handleValueChange={v => this.handleStartDateChange(v)}
            />
          <DateInput
            formField='endDate'
            label='End Date'
            required='-'
            />
          <Submit
            className='submit'
            invalid={this.formState.isInvalid()}
            validating={this.formState.isValidating()}
            grabRef={c => this.submitButton = c}
            />
          {instructions}
        </FormStateDisplay>
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
