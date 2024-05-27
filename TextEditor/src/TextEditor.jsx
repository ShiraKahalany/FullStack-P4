import React from 'react';
import './css/TextEditor.css';

const TextEditor = ({ text, textSize }) => {
  return (
    <div
      className="text-editor"
      style={{ fontSize: `${textSize}px` }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default TextEditor;
