import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoView from './components/views/DemoView.jsx';

// Using the optional validation library for react-formstate's fluent api
import { FormState } from 'react-formstate';
FormState.rfsProps.updateFormState.suppress = true;
import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);

ReactDOM.render(
  <DemoView/>,
  document.getElementById('react-mount-point')
);
