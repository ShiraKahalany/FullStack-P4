import React from 'react';

const Keyboard = ({ languages, onLanguageChange }) => {
  return (
    <div className="keyboard">
      {languages.map((language) => (
        <button key={language} onClick={() => onLanguageChange(language)}>
          {language}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
