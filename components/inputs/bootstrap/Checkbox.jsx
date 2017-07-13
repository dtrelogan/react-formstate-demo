import React from 'react';
import { Checkbox } from 'react-bootstrap';

const BootstrapCheckbox = ({label, checked, onChange, disabled, value}) => {
  return (
    <Checkbox checked={checked} onChange={onChange} disabled={disabled} value={value}>
      {label}
    </Checkbox>
  );
}

// would need to port this to prop-types package
//
// BootstrapCheckbox.propTypes = {
//   label: React.PropTypes.string.isRequired,
//   checked: React.PropTypes.bool.isRequired,
//   onChange: React.PropTypes.func.isRequired,
//   disabled: React.PropTypes.bool,
//   value: React.PropTypes.string
// };

export default BootstrapCheckbox;
