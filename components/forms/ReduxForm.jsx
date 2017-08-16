import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormState, Form } from 'react-formstate';
import { library as vlib } from 'react-formstate-validation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ShowModel from '../parts/ShowModelHoc.jsx';
import { FormStateDisplay, addCurrentModelToUpdates } from '../parts/FormStateDisplay.jsx';
import Instructions from '../parts/Instructions.jsx';

import HiddenInput from '../inputs/rfs-bootstrap/HiddenInput.jsx';
import Input from '../inputs/rfs-bootstrap/Input.jsx';
import Select from '../inputs/rfs-bootstrap/Select.jsx';
import RadioGroup from '../inputs/rfs-bootstrap/RadioGroup.jsx';
import Submit from '../inputs/bootstrap/Submit.jsx';

import ReduxFormContainer from '../../redux/container.jsx';



const testModel = {
  id: 123,
  name: 'Buster Brown',
  energeticId: 1,
  musicId: 6
};

const options = (a) => {
  return a.map((name,id) => { return {id: id + 1, name}; });
}


class ReduxForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this, this.getState.bind(this), this.updateState.bind(this));
  }

  getState() {
    return this.props.stateFromReduxStore;
  }

  updateState(updates) {
    this.props.updateStateInReduxStore(
      addCurrentModelToUpdates(this.formState, updates)
    );
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
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/ReduxForm.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>Form state and current model are stored in a Redux store</ListGroupItem>
        </ListGroup>
      </Instructions>
    );

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.getState()}>
          <HiddenInput
            formField='id'
            defaultValue='0'
            intConvert
            />
          <Input
            formField='name'
            label='Name'
            required
            autoComplete='off'
            />
          <RadioGroup
            formField='energeticId'
            label='Energetic?'
            buttonValues={options(['Morning Person','NOT a Morning Person'])}
            required
            intConvert
            inline
            />
          <Select
            formField='musicId'
            label='Favorite Kind of Music'
            optionValues={options(['Rap','Rock','Reggae','Pop','Country','Classical','Jazz','Electronica','I Dislike All Forms of Music'])}
            required
            intConvert
            />
          <Submit
            className='submit'
            invalid={this.formState.isInvalid()}
            grabRef={c => this.submitButton = c}
            />
          {instructions}
        </FormStateDisplay>
      </Form>
    );
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


const Hoc = ReduxFormContainer(ShowModel(ReduxForm));
Hoc.testModel = testModel;
export default Hoc;
