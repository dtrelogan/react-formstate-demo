import React, { Component } from 'react';
import { Form as InlineForm, Jumbotron, Button, Radio } from 'react-bootstrap';
import { FormState } from 'react-formstate';
import Select from '../inputs/bootstrap/Select.jsx';
import UserAccountForm from '../forms/UserAccount.jsx';
import EventForm from '../forms/Event.jsx';
import LoginForm from '../forms/Login.jsx';
import DependentsForm from '../forms/Dependents.jsx';
import OtherInputsForm from '../forms/OtherInputs.jsx';
import ReduxForm from '../forms/ReduxForm.jsx';
import DependentsReduxForm from '../forms/DependentsRedux.jsx';
import { v4 as uuid } from 'uuid';


export default class DemoView extends Component {

  constructor(props) {
    super(props);

    let formName = 'UserAccount';
    if (location.search.toLowerCase().endsWith('form=useraccount')) {formName = 'UserAccount';}
    if (location.search.toLowerCase().endsWith('form=event')) {formName = 'Event';}
    if (location.search.toLowerCase().endsWith('form=login')) {formName = 'Login';}
    if (location.search.toLowerCase().endsWith('form=dependents')) {formName = 'Dependents';}
    if (location.search.toLowerCase().endsWith('form=otherinputs')) {formName = 'OtherInputs';}
    if (location.search.toLowerCase().endsWith('form=redux')) {formName = 'Redux';}
    if (location.search.toLowerCase().endsWith('form=dependentsredux')) {formName = 'DependentsRedux';}

    this.state = {
      formName,
      formInstanceId: uuid(),
      edit: false,
      showMessageOn: 'change',
      validateOnBlur: false
    };


    this.forms = {
      'UserAccount' : {
        name: 'User Account (async validation)',
        type: UserAccountForm
      },
      'Event' : {
        name: 'Event (non-HTML input)',
        type: EventForm
      },
      'Login' : {
        name: 'Login (onUpdate callback)',
        type: LoginForm
      },
      'Dependents' : {
        name: 'Dependents (nested form components)',
        type: DependentsForm
      },
      'OtherInputs' : {
        name: 'Other Inputs',
        type: OtherInputsForm
      },
      'Redux' : {
        name: 'Redux Integration',
        type: ReduxForm
      },
      'DependentsRedux' : {
        name: 'Dependents (alternate implementation)',
        type: DependentsReduxForm
      }
    };
  }


  render() {

    const Form = this.forms[this.state.formName].type;
    const spacer = <span>&nbsp;&nbsp;&nbsp;</span>;

    return (
      <div>
        <Jumbotron>
          <span className='main-title'>react-formstate-demo</span> <span className='choose-a-form-label'>Choose&nbsp;a&nbsp;form:</span>
          <Select
            className='demo-form-select'
            controlId='formSelect'
            optionValues={Object.keys(this.forms).map(id => {return {id, name: this.forms[id].name}})}
            value={this.state.formName}
            onChange={e => this.setState({edit: false, formName: e.target.value, formInstanceId: uuid()})}
            />
          <InlineForm className='main-demo-options' inline>
            <Select
              className='select-show-message-on'
              controlId='selectShowMessageOn'
              optionValues={[{id: 'change', name: 'onChange'},{id: 'blur', name: 'onBlur'},{id: 'submit', name: 'onSubmit'}]}
              value={this.state.showMessageOn}
              onChange={(e) => this.showMessageOn(e.target.value)}
              />
            <Radio checked={this.state.edit} onClick={() => this.setState({formInstanceId: uuid(), edit: !this.state.edit})} onChange={() => {}}>
              &nbsp;Edit Existing Model&nbsp;&nbsp;&nbsp;
            </Radio>
            <Radio checked={this.state.validateOnBlur} onClick={() => this.toggleValidateOnBlur()} onChange={() => {}}>
              &nbsp;Ensure Validation onBlur&nbsp;&nbsp;&nbsp;
            </Radio>
          </InlineForm>
          <Button className='resetButton' onClick={() => this.setState({formInstanceId: uuid()})}>
            Reset Form
          </Button>
        </Jumbotron>
        <Form
          key={this.state.formInstanceId}
          model={this.state.edit ? Form.testModel : null}
          store={this.props.store}
          formId={this.state.formInstanceId}
          />
      </div>
    );
  }


  // These are standard react-formstate settings that influence
  // the standard onChange and onBlur handlers.
  //
  // Note you can override them "locally" on the formState instance for a particular form component.

  showMessageOn(newSetting) {
    FormState.showMessageOn(newSetting);
    this.setState({showMessageOn: newSetting});
  }

  toggleValidateOnBlur() {
    FormState.setEnsureValidationOnBlur(!this.state.validateOnBlur);
    this.setState({validateOnBlur: !this.state.validateOnBlur})
  }
};
