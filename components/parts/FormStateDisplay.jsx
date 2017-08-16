import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// cull form state:
//  remove the model since that is shown separately.
//  remove the root formState record to conserve space.
//  remove the messageVisible prop since that is deprecated.
const cullFormState = state => {
  return Object.keys(state).reduce((s,k) => {
    if (k !== 'model' && k !== 'formState.') {
      const v = state[k];
      if (v !== null && typeof(v) === 'object') {
        s[k] = Object.keys(v).filter(k => k !== 'messageVisible').reduce((fi, k) => {
          fi[k] = v[k];
          return fi;
        }, {});
      } else {
        s[k] = v;
      }
    }
    return s;
  }, {});
};

const jsonUndefinedReplacer = (k, v) => (
  v === undefined ? "(undefined)" : v
);



export const addCurrentModelToUpdates = (formState, updates) => {
  const context = formState.createUnitOfWork(updates);
  const model = context.createModelResult().model;
  return {...updates, model};
};


export const FormStateDisplay = ({state, children}) => {

  return (
    <Grid fluid>
      <Row>
        <Col xs={12} sm={6} lg={4}>
          {children}
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <h3>Model</h3>
          <pre>
            {JSON.stringify(state.model, null, 2)}
          </pre>
          <h3>Form State</h3>
          <pre>
            {JSON.stringify(cullFormState(state), jsonUndefinedReplacer, 2)}
          </pre>
        </Col>
        <Col xsHidden lg={4}/>
      </Row>
    </Grid>
  );
};
