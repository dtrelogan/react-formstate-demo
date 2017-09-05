import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ShowModel from '../parts/ShowModelHoc.jsx';
import { FormStateDisplay, addCurrentModelToUpdates } from '../parts/FormStateDisplay.jsx';
import Instructions from '../parts/Instructions.jsx';

import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import { Input as RfsInput } from '../inputs/rfs-bootstrap/Input.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';



// Only provide feedback for validation failure, so as not to confuse success
// feedback as having anything to do with the login credentials.

import { computeClassName } from  '../inputs/rfs-bootstrap/_processProps.es6';

const computeValidationStateAndHelp = (Input) => {
  return ({fieldState, showMessage, ...other}) => {

    let validationState = null, help = null;

    if (showMessage) {
      if (fieldState.isInvalid()) { validationState = 'error'; }
      help = fieldState.getMessage();
    }

    const props = { fieldState, showMessage, validationState, help, ...other };

    return <Input {...props}/>;
  };
};

const Input = computeValidationStateAndHelp(computeClassName(RfsInput));


//
//
//
//
//


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.formState = FormState.create(this, () => this.state, this.updateState.bind(this));
    this.state = {};

    // set a callback from the standard onChange handler
    this.formState.onUpdate(this.onUpdate.bind(this));
  }

  updateState(updates) {
    this.setState(addCurrentModelToUpdates(this.formState, updates));
  }

  componentDidMount() {
    const context = this.formState.createUnitOfWork();
    context.injectModel(this.props.model);
    context.updateFormState();
  }

  editMode() {
    return Boolean(this.props.model);
  }

  onUpdate(context) {
    // if in the process of logging in, ignore user input
    if (this.state.loggingIn) { return; }

    // after a failed login, once the user enters something,
    // clear 'Invalid username or password' message
    context.updateFormState({failedLogin: false});
  }

  render() {
    const instructions = (
      <Instructions>
        <ListGroup>
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Login.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>Use username=huckle and password=busytown for a successful login</ListGroupItem>
          <ListGroupItem>
            This demonstrates the use of the onUpdate callback from the standard change handler. Any input after a failed login will clear the failure message.
          </ListGroupItem>
          <ListGroupItem>This form has a customized input component experience.</ListGroupItem>
        </ListGroup>
      </Instructions>
    );

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.state}>
          <div className='failed-login-message'>{this.state.failedLogin ? 'Invalid username or password' : null}</div>
          <Input
            formField='username'
            label='Username'
            required
            autoComplete='off'
            />
          <Input
            formField='password'
            label='Password'
            required
            type='password'
            />
          <Submit
            className='submit'
            invalid={this.formState.isInvalid()}
            message={this.state.loggingIn ? 'Logging in...' : null}
            bsStyle={this.state.loggingIn ? 'warning' : null}
            disabled={this.state.loggingIn ? true : null}
            grabRef={c => this.submitButton = c}
            />
          {instructions}
        </FormStateDisplay>
      </Form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    ReactDOM.findDOMNode(this.submitButton).focus();
    if (this.state.loggingIn) { return; }
    const model = this.formState.createUnitOfWork().createModel();
    if (model) {
      this.setState({loggingIn: true, failedLogin: false});

      // simulate a login attempt
      window.setTimeout(function() {
        if (model.username === 'huckle' && model.password === 'busytown') {
          // alert('successful login'); // update user session...
          this.setState({loggingIn: false, failedLogin: false});
          this.props.showModel(Object.assign({message: 'Successful Login!'}, model));
        } else {
          this.setState({loggingIn: false, failedLogin: true});
        }
      }.bind(this), 2000);
    }
  }
}


export default ShowModel(LoginForm);
