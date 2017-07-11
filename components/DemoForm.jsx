import React, { Component } from 'react';
import { FormState, Form } from 'react-formstate';
import Input from './RfsInput';

// Using the optional validation library to demonstrate fluent api
import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);


export default class ChangePasswordForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateConfirmNewPassword = this.validateConfirmNewPassword.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  // you can write plain old validation code
  validateConfirmNewPassword(confirmationValue, context) {
    if (confirmationValue !== context.get('newPassword')) {
      return 'Password confirmation does not match';
    }
  }


  // or you can use a fluent validation api as appropriate
  render() {
    return (
      <Form formState={this.formState} onSubmit={this.handleSubmit}>
        <Input
          formField='newPassword'
          type='password'
          label='New Password'
          required
          fsv={v => v.regex(/^\S+$/)
            .msg('Password must not contain whitespace')
            .minLength(8)
            .msg('Password must be at least 8 characters')
          }
          handleValueChange={this.handlePasswordChange}
          />
        <Input
          formField='confirmNewPassword'
          type='password'
          label='Confirm New Password'
          required
          validate={this.validateConfirmNewPassword}
          />
        <input type='submit' value='Submit' disabled={this.formState.isInvalid()}/>
      </Form>
    );
  }


  // you can override the framework generated change handler if necessary
  handlePasswordChange(newPassword) {
    const context = this.formState.createUnitOfWork();
    context.set('newPassword', newPassword).validate();
    context.set('confirmNewPassword', ''); // clear the confirmation field
    context.updateFormState(); // make a call to setState
  }


  handleSubmit(e) {
    e.preventDefault();
    const model = this.formState.createUnitOfWork().createModel();
    if (model) {
      alert(JSON.stringify(model)); // proceed with valid data
    }
    // else: createModel called setState to set the appropriate validation messages
  }
}
