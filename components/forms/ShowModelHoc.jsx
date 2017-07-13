import React, { Component } from 'react';
import SimpleModal from '../inputs/bootstrap/SimpleModal.jsx';

export default (Form) => {
  return class ShowModel extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <div>
          <Form {...this.props} showModel={(model) => this.setState({model: model})}/>
          <SimpleModal title='Model Output' show={Boolean(this.state.model)} onClose={() => this.setState({model: null})}>
            <pre>
              {JSON.stringify(this.state.model, null, 2)}
            </pre>
          </SimpleModal>
        </div>
      );
    }
  };
};
