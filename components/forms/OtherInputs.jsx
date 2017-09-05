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
import Submit from '../inputs/bootstrap/Submit.jsx';
import Select from '../inputs/rfs-bootstrap/Select.jsx';
import TextArea from '../inputs/rfs-bootstrap/TextArea.jsx';
import RadioGroup from '../inputs/rfs-bootstrap/RadioGroup.jsx';
import ValidatedCheckbox from '../inputs/rfs-bootstrap/ValidatedCheckbox.jsx';
import CheckboxGroup from '../inputs/rfs-bootstrap/CheckboxGroup.jsx';


const testModel = {
  favoriteOceanId: 2,
  lunchIds: [1,2,3,4,5,6,7],
  say: 'Thank you for your interest in react-formstate',
  yumIds: [1,2,3,4,5],
  youCheckedTheBox: true
};


const options = (a) => {
  return a.map((name,id) => { return {id: id + 1, name}; });
}


class OtherInputsForm extends Component {

  constructor(props) {
    super(props);
    this.formState = FormState.create(this, () => this.state, this.updateState.bind(this));
    this.state = {};
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
          <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/OtherInputs.jsx'>source code</a></ListGroupItem>
          <ListGroupItem>This demonstrates inputs not yet covered by the other examples.</ListGroupItem>
          <ListGroupItem>Using intConvert to transform ids back to integers for model output.</ListGroupItem>
          <ListGroupItem>The text area uses noTrim for model output.</ListGroupItem>
          <ListGroupItem>The text area value has a validated limit of 140 characters.</ListGroupItem>
        </ListGroup>
      </Instructions>
    );

    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <FormStateDisplay state={this.state}>
          <RadioGroup
            formField='favoriteOceanId'
            label='Favorite Ocean'
            buttonValues={options(['Arctic', 'Atlantic', 'Indian', 'Pacific', 'Southern', 'Billy'])}
            required="Water, water, everywhere... ap-par-ent-ly you don't care"
            intConvert
            />
          <CheckboxGroup
            formField='lunchIds'
            label='Lunch'
            checkboxValues={options(['Sandwich','Potato Chips','Fruit','Pickle','Milkshake','Beer','Martini(s)'])}
            required='-'
            fsv={v => v.minLength(1).msg('Not hungry?')}
            intConvert
            defaultValue={[]}
            />
          <TextArea
            formField='say'
            label='Say Something'
            required="C'mon say SOMETHING"
            fsv={(x) => x.maxLength(140)}
            noTrim
            />
          <Select
            formField='yumIds'
            label='Yum!'
            multiple
            optionValues={options(['Cake','Cookies','Pie','Ice Cream','Doughnuts'])}
            required='-'
            fsv={v => v.minLength(1).msg('Got something against cake?')}
            size={5}
            intConvert
            defaultValue={[]}
            />
          <ValidatedCheckbox
            formField='youCheckedTheBox'
            label='You must check this box'
            required='-'
            fsv={v => v.equals(true).msg('YOU ABSOLUTELY MUST CHECK THIS BOX!')}
            />
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




  handleSubmit(e) {
    e.preventDefault();
    ReactDOM.findDOMNode(this.submitButton).focus();
    const model = this.formState.createUnitOfWork().createModel();
    if (model) {
      this.props.showModel(model);
    }
  }
}


const Hoc = ShowModel(OtherInputsForm);
Hoc.testModel = testModel;
export default Hoc;
