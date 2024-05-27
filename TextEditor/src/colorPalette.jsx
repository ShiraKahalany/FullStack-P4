import React from 'react';
import './css/colorPalette.css';

const ColorPalette = ({ onColorChange }) => {
  const colors = ['black', 'red', 'green', 'blue', 'orange', 'purple', 'brown', 'gray', 'pink', 'yellow', 'cyan', 'magenta'];
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
        ></button>
      ))}
    </div>
  );
};

export default ColorPalette;
