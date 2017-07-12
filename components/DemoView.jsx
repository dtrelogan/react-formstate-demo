import React, { Component } from 'react';
import { Jumbotron, ButtonToolbar, Button } from 'react-bootstrap';
import RadioGroup from './inputs/bootstrap/RadioGroup.jsx';
import DemoForm from './DemoForm.jsx';

export default class DemoView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: 0,
      edit: false,
      showOnBlur: false,
      validateOnBlur: false
    };

    this.model = {
      name: 'Danny Trelogan',
      newPassword: 'password',
      confirmNewPassword: 'password',
      when: '2017-07-12T18:32:24.402Z'
    };
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>react-formstate-demo</h1>
          <ButtonToolbar className='demo-toolbar'>
            <Button onClick={() => this.setState({key: this.state.key + 1, edit: false})}>
              Clear Form
            </Button>
            <Button onClick={() => this.setState({key: this.state.key + 1, edit: true})}>
              Inject Model
            </Button>
            <Button onClick={() => this.setState({showOnBlur: !this.state.showOnBlur})}>
              {this.state.showOnBlur ? 'Show onChange' : 'Show onBlur'}
            </Button>
            <Button onClick={() => this.setState({validateOnBlur: !this.state.validateOnBlur})}>
              {this.state.validateOnBlur ? 'No Validation onBlur' : 'Validate onBlur'}
            </Button>
          </ButtonToolbar>
        </Jumbotron>
        <DemoForm
          key={this.state.key}
          model={this.state.edit ? this.model : null}
          showOnBlur={this.state.showOnBlur}
          validateOnBlur={this.state.validateOnBlur}
          />
      </div>
    );
  }
};
