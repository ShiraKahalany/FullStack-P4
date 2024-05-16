import React from 'react';

const Toolbar = ({ onAction }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAction('delete')}>Delete</button>
      <button onClick={() => onAction('clear')}>Clear</button>
      {/* Add more buttons for other actions */}
    </div>
  );
};

export default Toolbar;
