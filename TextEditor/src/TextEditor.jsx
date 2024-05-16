import React, { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      className="text-editor"
      placeholder="Start typing here..."
    />
  );
};

export default TextEditor;
