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


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);

    // set a callback from the standard onChange handler
    this.formState.onUpdate(this.onUpdate.bind(this));
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
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row><div className='failed-login-message'>{this.state.failedLogin ? 'Invalid username or password' : null}</div></Row>
          <Row><Input formField='username' label='Username' required autoComplete='off' /></Row>
          <Row><Input formField='password' label='Password' required type='password' /></Row>
          <Row>
            <Submit
              className='submit'
              invalid={this.formState.isInvalid()}
              message={this.state.loggingIn ? 'Logging in...' : null}
              bsStyle={this.state.loggingIn ? 'warning' : null}
              disabled={this.state.loggingIn ? true : null}
              grabRef={c => this.submitButton = c}
              />
          </Row>
        </Grid>
        <Instructions>
          <ListGroup>
            <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Login.jsx'>source code</a></ListGroupItem>
            <ListGroupItem>Use username=huckle and password=busytown for a successful login</ListGroupItem>
            <ListGroupItem>
              This demonstrates the use of the onUpdate callback from the standard change handler. Any input after a failed login will clear the failure message.
            </ListGroupItem>
          </ListGroup>
        </Instructions>
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
