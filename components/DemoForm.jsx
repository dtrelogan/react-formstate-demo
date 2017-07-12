import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { Grid, Row, Col } from 'react-bootstrap';
import Input from './inputs/rfs-bootstrap/Input.jsx';
import Submit from './inputs/bootstrap/Submit.jsx';
import SimpleModal from './inputs/bootstrap/SimpleModal.jsx';
import DateInput from './inputs/rfs-bootstrap/DateInput.jsx';
import moment from 'moment';


export default class ChangePasswordForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);

    // might need to "reverse coerce" a string to a moment here
    // i.e., moment('2017-07-12T18:32:24.402Z');
    // otherwise set an appropriate default value
    // pass true to skip flattening the moment object into form state.
    this.formState.add(this.state, 'when', (props.model && props.model.when) ? moment(props.model.when) : null, true);

    this.updateBlurSettings(props);
  }

  updateBlurSettings(props) {
    // These are standard react-formstate settings that influence
    // the standard onChange and onBlur handlers.
    // You can also set them application wide on the FormState class.
    this.formState.setShowMessageOnBlur(props.showOnBlur);
    this.formState.setEnsureValidationOnBlur(props.validateOnBlur);
  }

  componentWillReceiveProps(newProps) {
    this.updateBlurSettings(newProps);
  }


  // <RadioGroup
  //   controlId='onBlurToggle'
  //   inline
  //   buttonValues={[{id: '1', text: 'onChange'}, {id: '2', text: 'onBlur'}]}
  //   value={this.state.onBlurToggle}
  //   onChange={e => this.setState({onBlurToggle: e.target.value})}
  //   />


  validateNewPassword(newPassword, context) {
    if (!vlib.regex(newPassword, /^\S+$/)) {
      return 'Password must not contain whitespace';
    }
    if (newPassword.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (newPassword.length < 12) {
      const fi = context.getFieldState('newPassword');
      fi.setValid('Passwords are ideally at least 12 characters');
      fi.set('warn', true);
      return;
    }
  }


  validateConfirmNewPassword(confirmationValue, context) {
    if (confirmationValue !== context.get('newPassword')) {
      return 'Password confirmation does not match';
    }
  }


  validateWhen(value) {
    if (!value) {
      return 'When is required';
    }
  }


  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={6} lg={4}>
              <Input
                formField='name'
                label='Name'
                required
                fsv={v => v.minLength(8).msg("must be 8 chars")}
                autoComplete='off'
                />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <DateInput
                formField='when'
                label='When'
                required='-'
                />
            </Col>
            <Col xsHidden lg={4}/>
          </Row>
          <Row>
            <Col xs={12} sm={6} lg={4}>
              <Input
                formField='newPassword'
                type='password'
                label='New Password'
                required
                handleValueChange={v => this.handlePasswordChange(v)}
                />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <Input
                formField='confirmNewPassword'
                type='password'
                label='Confirm New Password'
                required
                />
            </Col>
            <Col xsHidden lg={4}/>
          </Row>
          <Row>
            <Col xs={12}>
              <Submit
                invalid={this.formState.isInvalid(this.formState.getu('showOnBlur'))}
                grabRef={c => this.submitButton = c}
                />
            </Col>
          </Row>
        </Grid>
        <SimpleModal
          title='Model Output'
          show={Boolean(this.state.modelOutput)}
          onClose={() => this.setState({modelOutput: null})}
          >
          <pre>
            {JSON.stringify(this.state.modelOutput, null, 2)}
          </pre>
        </SimpleModal>
      </Form>
    );
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
      this.setState({modelOutput: model});
    }
  }
}
