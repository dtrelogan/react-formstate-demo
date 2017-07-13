import React from 'react';

export default ({children}) => {
  return (
    <div className='instructions'>
      <h3>Notes</h3>
      {children}
    </div>
  );
};
