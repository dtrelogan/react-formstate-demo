import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form, FormExtension, FormArray } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ShowModel from '../parts/ShowModelHoc.jsx';
import { FormStateDisplay, addCurrentModelToUpdates } from '../parts/FormStateDisplay.jsx';
import Instructions from '../parts/Instructions.jsx';

import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import Input from '../inputs/rfs-bootstrap/Input.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';
import Select from '../inputs/rfs-bootstrap/Select.jsx';

import ReduxFormContainer from '../../redux/container.jsx';



//
//
// Register a reusable validation
// (normally you'd do this in a more central location)
//
//
const capitalized = (v) => {
  return typeof(v) === 'string' && v.substring(0,1) !== v.substring(0,1).toLowerCase();
}
FormState.registerValidation('capitalize', (value, label) => {
  if (!capitalized(value)) {
    return `${label} should be capitalized`;
  }
});


const testModel = {
  id: 8910,
  name: 'Father Cat',
  dependents: [
    { id: 1, name: 'Huckle Cat', age: 8 },
    { id: 2, name: 'Sally Cat', age: 5 },
    { id: 3, name: 'Lowly the Worm', age: 8 }
  ]
};

const ageOptions = [];

for (let i = 0; i < 150; i++) {
  ageOptions.push({id: i.toString(), text: i.toString()});
}

// even though it's stateless, you have to make this extend Component to work with react-formstate
// so that react-formstate can retrieve generated props and pass them along to more deeply nested components
//
class Dependent extends Component {

  // could just as easily use the fluent API, but demonstrating an autowired validation function in a nested component.
  validateName(newName) {
    if (!capitalized(newName)) {
      return 'Name should be capitalized';
    }
  }

  render() {
    return (
      <FormExtension nestedForm={this}>
        <div>
          <HiddenInput
            formField='id'
            defaultValue='0'
            intConvert
            />
        </div>
        <div>
          <Input
            formField='name'
            label='Name'
            required
            autoComplete='off'
            />
        </div>
        <div>
          <Select
            formField='age'
            label='Age'
            optionValues={ageOptions}
            required
            intConvert
            />
        </div>
      </FormExtension>
    );
  }
}




class DependentsForm extends Component {

  constructor(props) {
    super(props);
    this.formState = FormState.create(this, this.getState.bind(this), this.updateState.bind(this));
  }

  getState() {
    return this.props.stateFromReduxStore;
  }

  updateState(updates) {
    this.props.updateStateInReduxStore(
      updates.model ? updates : addCurrentModelToUpdates(this.formState, updates)
    );
  }

  componentDidMount() {
    const context = this.formState.createUnitOfWork();

    // explicit initialization
    // (note you should also transform the model on edit... skipping that here)
    const initialModel = this.props.model ? this.props.model : {
      id: '0',
      name: '',
      dependents: []
    };

    context.injectModel(initialModel);
    context.updateFormState({initialModel, model: initialModel});
  }

  editMode() {
    return Boolean(this.props.model);
  }

  render() {

    const {model} = this.getState();

    if (!model) { // initialized?
      return null;
    }

    const instructions = (
      <Instructions>
        <ListGroup>
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/DependentsRedux.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>This is an alternate implementation of the Dependents form.</ListGroupItem>
          <ListGroupItem>In this implementation, dynamic form fields are driven more directly by the backing model, using the more traditional approach of explicit initialization.</ListGroupItem>
          <ListGroupItem>Since we are actively doing something with the unsubmitted model prior to form submission (in this case, displaying it), this approach might be more intuitive to people, but it is unclear whether it is actually less complex.</ListGroupItem>
          <ListGroupItem>You can use either approach with react-formstate</ListGroupItem>
        </ListGroup>
      </Instructions>
    );

    const dependents = [];

    for (let modelIndex = 0, formStateIndex = 0; modelIndex < model.dependents.length; formStateIndex++) {
      if (!this.formState.isDeleted(`dependents.${formStateIndex}`)) {
        dependents.push(
          <ListGroup key={formStateIndex}>
            <ListGroupItem>
              <Dependent formObject={formStateIndex}/>
              <div>
                <a href='#' onClick={this.removeDependent(modelIndex, formStateIndex)}>remove</a>
              </div>
            </ListGroupItem>
          </ListGroup>
        );

        modelIndex++;
      }
    }

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.getState()}>
          <HiddenInput formField='id' defaultValue='0' intConvert/>
          <Input
            formField='name'
            label='Name'
            required
            fsv={v => v.capitalize()}
            autoComplete='off'
            />
          <div className='add-dependent'>
            <a href='#' onClick={e => this.addDependent(e)}>add dependent</a>
          </div>
          <FormArray name='dependents'>
            {dependents}
          </FormArray>
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


  addDependent(e) {
    e.preventDefault();

    const newDependent = {
      // explicit initialization
      id: '0',
      name: '',
      age: ''
    };

    let {model} = this.getState();
    model = {...model, dependents: [...model.dependents, newDependent]};

    const context = this.formState.createUnitOfWork();
    context.injectField(`dependents.${model.dependents.length - 1}`, newDependent);
    context.updateFormState({model});
  }


  removeDependent(modelIndex, formStateIndex) {
    return (e) => {
      e.preventDefault();

      let {model} = this.getState();

      const dependents = [];
      for (let i = 0; i < model.dependents.length; i++) {
        if (i !== modelIndex) {
          dependents.push(model.dependents[i]);
        }
      }
      model = {...model, dependents};

      const context = this.formState.createUnitOfWork();
      context.remove(`dependents.${formStateIndex}`);
      context.updateFormState({model});
    };
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


const Hoc = ReduxFormContainer(ShowModel(DependentsForm));
Hoc.testModel = testModel;
export default Hoc;
