import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoForm from './components/DemoForm.jsx';

ReactDOM.render(
  <DemoForm/>,
  document.getElementById('react-mount-point')
);
