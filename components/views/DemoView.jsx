import React, { Component } from 'react';
import { Form as InlineForm, Jumbotron, Button, Radio } from 'react-bootstrap';
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
          startDate: '2019-07-12T18:32:24.402Z',
          endDate: '2019-07-26T18:32:24.402Z'
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
    const spacer = <span>&nbsp;&nbsp;&nbsp;</span>;

    return (
      <div>
        <Jumbotron>
          <h3 className='main-title'>react-formstate-demo</h3>
          <Select
            className='demo-form-select'
            controlId='formSelect'
            optionValues={Object.keys(this.forms).map(id => {return {id: id, name: this.forms[id].name}})}
            value={this.state.formId}
            onChange={e => this.setState({edit: false, formId: e.target.value})}
            />
          <InlineForm className='main-demo-options' inline>
            <Radio checked={this.state.edit} onClick={() => this.setState({key: this.state.key + 1, edit: !this.state.edit})}>
              &nbsp;Edit Existing Model
            </Radio>
            {spacer}
            <Radio checked={this.state.showOnBlur} onClick={() => this.toggleShowOnBlur()}>
              &nbsp;Show Message onBlur
            </Radio>
            {spacer}
            <Radio checked={this.state.validateOnBlur} onClick={() => this.toggleValidateOnBlur()}>
              &nbsp;Validate onBlur
            </Radio>
          </InlineForm>
          <Button onClick={() => this.setState({key: this.state.key + 1})}>
            Reset Form
          </Button>
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
