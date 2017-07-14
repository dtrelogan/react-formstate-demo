import React, { Component } from 'react';
import { Form as InlineForm, Jumbotron, Button, Radio } from 'react-bootstrap';
import { FormState } from 'react-formstate';
import Select from '../inputs/bootstrap/Select.jsx';
import UserAccountForm from '../forms/UserAccount.jsx';
import EventForm from '../forms/Event.jsx';
import LoginForm from '../forms/Login.jsx';


export default class DemoView extends Component {

  constructor(props) {
    super(props);

    let formId = 'UserAccount';
    if (location.search.toLowerCase().endsWith('form=useraccount')) {formId = 'UserAccount';}
    if (location.search.toLowerCase().endsWith('form=event')) {formId = 'Event';}
    if (location.search.toLowerCase().endsWith('form=login')) {formId = 'Login';}

    this.state = {
      formId,
      key: 0,
      edit: false,
      showOnBlur: false,
      validateOnBlur: false,
      showOnSubmit: false
    };


    this.forms = {
      'UserAccount' : {
        name: 'User Account (async validation)',
        type: UserAccountForm,
        model: {
          id: 123,
          name: 'Huckle',
          username: 'huckle'
        }
      },
      'Event' : {
        name: 'Event (non-HTML input)',
        type: EventForm,
        model: {
          id: 123,
          name: 'Travel to Europe (I wish!)',
          startDate: '2019-07-12T18:32:24.402Z',
          endDate: '2019-07-26T18:32:24.402Z'
        }
      },
      'Login' : {
        name: 'Login (onUpdate callback)',
        type: LoginForm,
        model: null
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
          <span className='main-title'>react-formstate-demo</span> <span className='choose-a-form-label'>Choose&nbsp;a&nbsp;form:</span>
          <Select
            className='demo-form-select'
            controlId='formSelect'
            optionValues={Object.keys(this.forms).map(id => {return {id: id, name: this.forms[id].name}})}
            value={this.state.formId}
            onChange={e => this.setState({edit: false, formId: e.target.value})}
            />
          <InlineForm className='main-demo-options' inline>
            <Radio checked={this.state.edit} onClick={() => this.setState({key: this.state.key + 1, edit: !this.state.edit})}>
              &nbsp;Edit Existing Model&nbsp;&nbsp;&nbsp;
            </Radio>
            <Radio checked={this.state.showOnBlur} onClick={() => this.toggleShowOnBlur()}>
              &nbsp;Show Message onBlur&nbsp;&nbsp;&nbsp;
            </Radio>
            <Radio checked={this.state.validateOnBlur} onClick={() => this.toggleValidateOnBlur()}>
              &nbsp;Ensure Validation onBlur&nbsp;&nbsp;&nbsp;
            </Radio>
            <Radio checked={this.state.showOnSubmit} onClick={() => this.toggleShowOnSubmit()}>
              &nbsp;Show Message onSubmit
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

  toggleShowOnSubmit() {
    FormState.setShowMessageOnSubmit(!this.state.showOnSubmit);
    this.setState({showOnSubmit: !this.state.showOnSubmit});
  }
};
