import React, { Component } from 'react';
import BootstrapSelect from '../bootstrap/Select.jsx';
import processProps from  './_processProps.es6';

export default class Select extends Component {

  render() {
    const {className, required, formState, fieldState, handleValueChange, showValidationMessage, ...other} = this.props;

    const {computedClassName, validationState, help} = processProps({className, required, formState, fieldState});

    return (
      <BootstrapSelect
        className={computedClassName}
        controlId={fieldState.getKey()}
        validationState={validationState}
        value={fieldState.getValue()}
        onChange={e => this.onChange(e)}
        onBlur={showValidationMessage}
        help={help}
        {...other}
        />
    );
  }

  onChange(e) {
    let value;

    if (this.props.multiple) {
      value = [];
      let options = e.target.options;
      for (let i = 0, len = options.length; i < len; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    } else {
      value = e.target.value;
    }

    this.props.handleValueChange(value);
  }
}
