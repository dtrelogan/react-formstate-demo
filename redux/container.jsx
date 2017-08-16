import React, { Component } from 'react';


export default (FormComponent) => {
  return class ReduxFormContainer extends Component {
    constructor(props) {
      super(props);
      this.updateFormStore = this.updateFormStore.bind(this);
    }

    componentDidMount() {
      this.createFormStore();
    }

    componentWillUnmount() {
      this.deleteFormStore();
    }

    // CRUD

    createFormStore() {
      this.props.store.dispatch({
        type: 'CREATE_FORM',
        id: this.props.formId
      });
    }

    readFormStore() {
      return this.props.store.getState().forms.filter(f => f.id === this.props.formId)[0];
    }

    updateFormStore(updates) {
      this.props.store.dispatch({
        type: 'UPDATE_FORM',
        id: this.props.formId,
        updates: updates
      });
    }

    deleteFormStore() {
      this.props.store.dispatch({
        type: 'DELETE_FORM',
        id: this.props.formId
      });
    }

    // render

    render() {
      const formStore = this.readFormStore();

      // initialized?

      if (formStore === undefined) {
        return null;
      }

      // else

      const { formId, store, ...other} = this.props;

      return (
        <FormComponent
          key={formId}
          stateFromReduxStore={formStore.state}
          updateStateInReduxStore={this.updateFormStore}
          {...other}
          />
      );
    }
  };
};
