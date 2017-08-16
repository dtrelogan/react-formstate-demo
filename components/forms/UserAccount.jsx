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


const testModel = {
  id: 123,
  name: 'Huckle',
  username: 'huckle'
};


class UserAccountForm extends Component {

  //
  //
  // Initialization and Lifecycle
  //
  //

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
    context.updateFormState();
  }

  editMode() {
    return Boolean(this.props.model);
  }

  //
  //
  // Validation
  //
  //

  validateName(newValue) {
    if (newValue.substring(0,1) === newValue.substring(0,1).toLowerCase()) {
      return 'Name should be capitalized';
    }
  }

  validateNewPassword(newPassword, context) {
    if (newPassword.trim() === '') { return; }
    if (!vlib.regex(newPassword, /^\S+$/)) { return 'Password must not contain whitespace'; }
    if (newPassword.length < 8) { return 'Password must be at least 8 characters'; }

    const fi = context.getFieldState('newPassword');
    if (newPassword.length < 12) {
      fi.setValid('Passwords are ideally at least 12 characters');
      fi.set('warn', true);
      return;
    }
  }

  validateConfirmNewPassword(confirmation, context) {
    const newPassword = context.get('newPassword');
    if (newPassword.trim() !== '' && confirmation !== newPassword) {
      return 'Password confirmation does not match';
    }
  }

  //
  //
  // Render
  //
  //

  render() {
    const instructions = (
      <Instructions>
        <ListGroup>
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/UserAccount.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>{'Try "taken" or "huckle" for username.'}</ListGroupItem>
          <ListGroupItem>Password not required if editing an existing account.</ListGroupItem>
          <ListGroupItem>For playing with the various blur options, use the following validations:
            <ul>
              <li>Name must be capitalized.</li>
              <li>Username must not contain spaces.</li>
              <li>Password minimum 8 characters, and no spaces.</li>
              <li>Password less than 12 characters will warn.</li>
            </ul>
          </ListGroupItem>
          <ListGroupItem>Password and confirmation fields use preferNull for model output - when editing an account and password is left unchanged.</ListGroupItem>
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
            label='Name'
            required
            autoComplete='off'
            />
          <Input
            formField='username'
            label='Username'
            required
            fsv={v => v.regex(/^\S+$/).msg('Username must not contain spaces')}
            handleValueChange={v => this.handleUsernameChange(v)}
            autoComplete='off'
            />
          <Input
            type='password'
            formField='newPassword'
            label={this.editMode() ? 'New Password' : 'Password'}
            required={!this.editMode()}
            handleValueChange={v => this.handlePasswordChange(v)}
            preferNull
            />
          <Input
            type='password'
            formField='confirmNewPassword'
            label={this.editMode() ? 'Confirm New Password' : 'Confirm Password'}
            required={!this.editMode()}
            preferNull
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

  //
  //
  // Handlers
  //
  //

  handleUsernameChange(username) {
    const context = this.formState.createUnitOfWork(),
      fieldState = context.set('username', username);

    fieldState.validate();
    if (fieldState.isInvalid()) {
      context.updateFormState();
      return;
    } // else

    if (username === fieldState.getInitialValue()) {
      fieldState.setValid();
      context.updateFormState();
      return;
    } // else

    const asyncToken = fieldState.setValidating('Verifying username...');
    context.updateFormState();

    // simulate calling an api
    window.setTimeout(() => {
      const context = this.formState.createUnitOfWork(),
        fieldState = context.getFieldState('username', asyncToken);

      // if the token still matches, the username we are verifying is still relevant
      if (fieldState) {
        if (username.toLowerCase() === 'taken' || username.toLowerCase() === 'huckle') {
          fieldState.setInvalid('Username already exists');
        } else {
          fieldState.setValid('Verified');
        }
        context.updateFormState();
      }
    }, 2000);
  }


  handlePasswordChange(newPassword) {
    const context = this.formState.createUnitOfWork();
    context.set('newPassword', newPassword).validate();
    context.set('confirmNewPassword', ''); // clear the confirmation field
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


const Hoc = ShowModel(UserAccountForm);
Hoc.testModel = testModel;
export default Hoc;
