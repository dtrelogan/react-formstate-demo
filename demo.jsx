import 'core-js/es';
import 'raf/polyfill'; // https://reactjs.org/docs/javascript-environment-requirements.html
import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoView from './components/views/DemoView.jsx';

// this requires css-loader and style-loader in webpack
import "react-datepicker/dist/react-datepicker.css";


// react-bootstrap 1 is not compatible with React 19
// so... cannot upgrade to React 19 as of Feb 2026


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

let root = ReactDOM.createRoot(
  document.getElementById('react-mount-point')
);

const renderApp = () => root.render(<DemoView store={store}/>);

store.subscribe(renderApp);

renderApp();
