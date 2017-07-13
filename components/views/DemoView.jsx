import React, { Component } from 'react';
import { Jumbotron, ButtonToolbar, Button } from 'react-bootstrap';
import { FormState } from 'react-formstate';
import Select from '../inputs/bootstrap/Select.jsx';
import UserAccountForm from '../forms/UserAccount.jsx';
import EventForm from '../forms/Event.jsx';

export default class DemoView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formId: '1',
      key: 0,
      edit: false,
      showOnBlur: false,
      validateOnBlur: false
    };


    this.forms = {
      '1' : {
        name: 'User Account (async validation)',
        type: UserAccountForm,
        model: {
          id: 123,
          name: 'Huckle',
          username: 'huckle'
        }
      },
      '2' : {
        name: 'Event (non-HTML input)',
        type: EventForm,
        model: {
          id: 123,
          name: 'Travel to Europe (I wish!)',
          from: '2019-07-12T18:32:24.402Z',
          to: '2019-07-26T18:32:24.402Z'
        }
      }
    };

    // const address = {
    //   line1: '123 Scarry Street',
    //   city: 'Busytown',
    //   state: 'MA',
    //   zip: '12345',
    //   country: 'USA'
    // };
  }


  render() {

    const Form = this.forms[this.state.formId].type;

    return (
      <div>
        <Jumbotron>
          <h1>react-formstate-demo</h1>
          <Select
            className='demo-form-select'
            controlId='formSelect'
            label='Select a form'
            optionValues={Object.keys(this.forms).map(id => {return {id: id, name: this.forms[id].name}})}
            value={this.state.formId}
            onChange={e => this.setState({formId: e.target.value})}
            />
          <ButtonToolbar className='demo-toolbar'>
            <Button onClick={() => this.setState({key: this.state.key + 1, edit: false})}>
              Clear Form
            </Button>
            <Button onClick={() => this.setState({key: this.state.key + 1, edit: true})}>
              Inject Model
            </Button>
            <Button onClick={() => this.toggleShowOnBlur()}>
              {this.state.showOnBlur ? 'Show onChange' : 'Show onBlur'}
            </Button>
            <Button onClick={() => this.toggleValidateOnBlur()}>
              {this.state.validateOnBlur ? 'No Validation onBlur' : 'Validate onBlur'}
            </Button>
          </ButtonToolbar>
        </Jumbotron>
        <Form
          key={this.state.key}
          model={this.state.edit ? this.forms[this.state.formId].model : null}
          />
      </div>
    );
  }


  // These are standard react-formstate settings that influence
  // the standard onChange and onBlur handlers.
  //
  // Note you can override them "locally" on the formState instance for a particular form component.

  toggleShowOnBlur() {
    FormState.setShowMessageOnBlur(!this.state.showOnBlur);
    this.setState({showOnBlur: !this.state.showOnBlur});
  }

  toggleValidateOnBlur() {
    FormState.setEnsureValidationOnBlur(!this.state.validateOnBlur);
    this.setState({validateOnBlur: !this.state.validateOnBlur})
  }
};
