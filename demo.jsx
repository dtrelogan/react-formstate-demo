import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoView from './components/views/DemoView.jsx';


//
// react-formstate
//

// Using the optional validation library for react-formstate's fluent api
import { FormState } from 'react-formstate';

// suppress deprecated props
FormState.rfsProps.updateFormState.suppress = true;
FormState.rfsProps.showValidationMessage.suppress = true;

import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);


//
// redux
//

import { createStore, combineReducers } from 'redux';
import { forms } from './redux/reducers.es6';

const store = createStore(
  combineReducers({ forms }),
  {}
);

const renderApp = () => {
  ReactDOM.render(
    <DemoView store={store}/>,
    document.getElementById('react-mount-point')
  );
};

store.subscribe(() => {
  renderApp();
});

renderApp();
