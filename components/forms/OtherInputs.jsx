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
import Select from '../inputs/rfs-bootstrap/Select.jsx';
import TextArea from '../inputs/rfs-bootstrap/TextArea.jsx';
import RadioGroup from '../inputs/rfs-bootstrap/RadioGroup.jsx';
import ValidatedCheckbox from '../inputs/rfs-bootstrap/ValidatedCheckbox.jsx';
import CheckboxGroup from '../inputs/rfs-bootstrap/CheckboxGroup.jsx';


const options = (a) => {
  return a.map((name,id) => { return {id: id + 1, name}; });
}

class UserAccountForm extends Component {

  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.injectModel(props.model);
  }

  editMode() {
    return Boolean(this.props.model);
  }

  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <Grid fluid>
          <Row>
            <RadioGroup
              formField='favoriteOceanId'
              label='Favorite Ocean'
              buttonValues={options(['Arctic', 'Atlantic', 'Indian', 'Pacific', 'Southern', 'Billy'])}
              required='Water, water, everywhere...'
              intConvert
              />
          </Row>
          <Row>
            <CheckboxGroup
              formField='lunchIds'
              label='Lunch'
              checkboxValues={options(['Sandwich','Potato Chips','Fruit','Pickle','Milkshake','Beer','Martini(s)'])}
              required='-'
              fsv={v => v.minLength(1).msg('Have something to eat please!')}
              intConvert
              />
          </Row>
          <Row>
            <TextArea
              formField='say'
              label='Say Something'
              required="C'mon say SOMETHING"
              fsv={(x) => x.maxLength(140)}
              noTrim
              />
          </Row>
          <Row>
            <Select
              formField='yumIds'
              label='Yum!'
              multiple
              optionValues={options(['Cake','Cookies','Pie','Ice Cream','Doughnuts'])}
              required='-'
              fsv={v => v.minLength(1).msg('Eat your dessert!')}
              size={5}
              intConvert
              />
          </Row>
          <Row>
            <ValidatedCheckbox
              formField='youCheckedTheBox'
              label='You must check this box'
              required='-'
              fsv={v => v.equals(true).msg('YOU ABSOLUTELY MUST CHECK THIS BOX!')}
              />
          </Row>
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
            <ListGroupItem>Check out the <a href='https://github.com/dtrelogan/react-formstate-demo/blob/HEAD/components/forms/OtherInputs.jsx'>source code</a></ListGroupItem>
            <ListGroupItem>This demonstrates inputs not yet covered by the other examples.</ListGroupItem>
            <ListGroupItem>Using intConvert to transform ids back to integers for model output.</ListGroupItem>
            <ListGroupItem>The text area uses noTrim for model output.</ListGroupItem>
            <ListGroupItem>The text area value has a validated limit of 140 characters.</ListGroupItem>
          </ListGroup>
        </Instructions>
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


export default ShowModel(UserAccountForm);
