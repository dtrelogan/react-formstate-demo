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

class UserAccountForm extends Component {

  //
  //
  // Initialization and Lifecycle
  //
  //

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);
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
              label='Name'
              required
              autoComplete='off'
              />
          </Row>
          <Row>
            <Input
              formField='username'
              label='Username'
              required
              fsv={v => v.regex(/^\S+$/).msg('Username must not contain spaces')}
              handleValueChange={v => this.handleUsernameChange(v)}
              autoComplete='off'
              />
          </Row>
          <Row>
            <Input
              type='password'
              formField='newPassword'
              label={this.editMode() ? 'New Password' : 'Password'}
              required={!this.editMode()}
              handleValueChange={v => this.handlePasswordChange(v)}
              preferNull
              />
          </Row>
          <Row>
            <Input
              type='password'
              formField='confirmNewPassword'
              label={this.editMode() ? 'Confirm New Password' : 'Confirm Password'}
              required={!this.editMode()}
              preferNull
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
      </Form>
    );
  }

  //
  //
  // Handlers
  //
  //

  originalUsername() {
    return this.props.model && this.props.model.username;
  }

  handleUsernameChange(username) {
    const context = this.formState.createUnitOfWork(),
      fieldState = context.set('username', username);

    fieldState.validate();
    if (fieldState.isInvalid()) {
      context.updateFormState();
      return;
    } // else

    if (username === this.originalUsername()) {
      fieldState.setValid('Verified');
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
        fieldState.showMessage();
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


export default ShowModel(UserAccountForm);
