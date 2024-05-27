import React from 'react';

const FontFamilySelector = ({ onFontFamilyChange }) => {
  const fontFamilies = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

  return (
    <select onChange={(e) => onFontFamilyChange(e.target.value)}>
      <option value="">Select Font Family</option>
      {fontFamilies.map((font, index) => (
        <option key={index} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontFamilySelector;
