import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form, FormExtension, FormArray } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
import Row from '../layout/bootstrap/SingleColumnRow.jsx';
import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import Input from '../inputs/rfs-bootstrap/Input.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';
import ShowModel from './ShowModelHoc.jsx';
import Instructions from './Instructions.jsx';
import Select from '../inputs/rfs-bootstrap/Select.jsx';


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

  validateName(newValue) {
    if (newValue.substring(0,1) === newValue.substring(0,1).toLowerCase()) {
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
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);

    this.state.numDependents = 0;
    if (props.model && props.model.dependents) {
      this.state.numDependents = props.model.dependents.length;
    }
  }

  editMode() {
    return Boolean(this.props.model);
  }

  render() {
    const dependents = [];

    for (let i = 0; i < this.state.numDependents; i++) {
      if (!this.formState.isDeleted(`dependents.${i}`)) {
        dependents.push(
          <Row key={i}>
            <ListGroup>
              <ListGroupItem>
                <Dependent formObject={i}/>
                <div>
                  <a href='#' onClick={this.removeDependent(i)}>remove</a>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Row>
        );
      }
    }

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row><HiddenInput formField='id' defaultValue='0' intConvert/></Row>
          <Row>
            <Input
              formField='name'
              label='Name'
              required
              autoComplete='off'
              />
          </Row>
          <Row>
            <div className='add-dependent'>
              <a href='#' onClick={e => this.addDependent(e)}>add dependent</a>
            </div>
          </Row>
          <FormArray name='dependents'>
            {dependents}
          </FormArray>
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
            <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/Dependents.jsx'>source code</a></ListGroupItem>
            <ListGroupItem>This demonstrates a very simple nested form component.</ListGroupItem>
            <ListGroupItem>It also demonstrates dynamically adding and removing inputs and the resulting model output.</ListGroupItem>
            <ListGroupItem>The intConvert setting transforms the age value to a number upon output.</ListGroupItem>
          </ListGroup>
        </Instructions>
      </Form>
    );
  }

  addDependent(e) {
    e.preventDefault();
    this.setState({ numDependents: this.state.numDependents + 1 });
  }


  removeDependent(i) {
    return (e) => {
      e.preventDefault();
      const context = this.formState.createUnitOfWork();
      context.remove(`dependents.${i}`);
      context.updateFormState();
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
