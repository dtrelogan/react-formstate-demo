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
    this.formState = FormState.create(this, () => this.state, this.updateState.bind(this));
    this.state = {};

    this.state.numDependents = 0;
    if (props.model && props.model.dependents) {
      this.state.numDependents = props.model.dependents.length;
    }
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

  render() {
    const instructions = (
      <Instructions>
        <ListGroup>
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Dependents.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>This demonstrates a very simple nested form component.</ListGroupItem>
          <ListGroupItem>It also demonstrates dynamically adding and removing inputs and the resulting model output.</ListGroupItem>
          <ListGroupItem>The intConvert setting transforms the age value to a number upon output.</ListGroupItem>
        </ListGroup>
      </Instructions>
    );

    const dependents = [];

    for (let i = 0; i < this.state.numDependents; i++) {
      if (!this.formState.isDeleted(`dependents.${i}`)) {
        dependents.push(
          <ListGroup key={i}>
            <ListGroupItem>
              <Dependent formObject={i}/>
              <div>
                <a href='#' onClick={this.removeDependent(i)}>remove</a>
              </div>
            </ListGroupItem>
          </ListGroup>
        );
      }
    }

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.state}>
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


  componentDidUpdate() {
    // Since the unsubmitted model is being shown before the form is submitted,
    // you have to do something special here to support that behavior.

    // If you are adding or removing a dependent, and you want the unsubmitted
    // model to "immediately" reflect the new dependent, you have to render THEN
    // regenerate the model.

    // Here's what happens:

    // 1 - You increase the number of dependents and call updateFormState.
    // 2 - This generates the unsubmitted model for display, but
    //    the fields configured in the JSX remain the same as before,
    //    so the "updated" model doesn't reflect the new dependent.
    // 3 - A render takes place and the fields for the new dependent are now in
    //    in the JSX, but the new unsubmitted model hasn't been generated
    //    based on those fields.
    // 4 - componentDidUpdate gets called which, because the 'forceModelUpdate'
    //    flag is set, immediately calls updateFormState to generate the
    //    unsubmitted model WITH the new fields.

    // A possible enhancement would be to somehow dynamically add fields
    // directly in the handler. Then you could immediately generate an unsubmitted
    // model with the new fields.... That'd be hard to implement though, and for
    // not much gain.

    // An alternate approach is to add a dependent directly to the unsubmitted model
    // in the event handler, then dynamically generate the fields during render based
    // on the dependents present in the unsubmitted model. See the 'DependentsRedux'
    // form for an example of this implementation.

    // If you aren't doing anything with the unsubmitted model prior to form
    // submission, you don't need this 'forceModelUpdate' behavior and this approach
    // becomes much easier.

    // If you ARE doing something with the unsubmitted model prior to form submission,
    // the 'DependentsRedux' approach using explicit initialization might be more
    // intuitive, but it's unclear whether it's actually less complex. With
    // react-formstate you can use either approach.

    if (this.state.forceModelUpdate) {
      this.updateState({forceModelUpdate: false});
    }
  }

  addDependent(e) {
    e.preventDefault();
    this.updateState({
      numDependents: this.state.numDependents + 1,
      forceModelUpdate: true
    });
  }


  removeDependent(i) {
    return (e) => {
      e.preventDefault();
      const context = this.formState.createUnitOfWork();
      context.remove(`dependents.${i}`);
      context.updateFormState({forceModelUpdate: true});
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


const Hoc = ShowModel(DependentsForm);
Hoc.testModel = testModel;
export default Hoc;
