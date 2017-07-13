import React from 'react';

export default ({fieldState}) => {
  return (
    <input type='hidden' value={fieldState.getValue()}/>
  );
};
