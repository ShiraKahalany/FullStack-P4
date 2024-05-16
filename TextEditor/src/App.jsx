import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [isEnglishKeyboard, setIsEnglishKeyboard] = useState(true);
  const [isUppercase, setIsUppercase] = useState(true);
  const [textColor, setTextColor] = useState('black');
  const [selectedColor, setSelectedColor] = useState(null); // State to manage selected color

  const englishCapitalLetters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Space', 'Delete']
  ];

  const englishSmallLetters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['Space', 'Delete']
  ];

  const hebrewLetters = [
    ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'],
    ['כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר'],
    ['ש', 'ת', 'ם', 'ן', 'ף', 'ץ'],
    ['רווח', 'מחק']
  ];

  const specialCharacters = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['?', '#', '$', '%', '&', '@', '!', '*', '+', '-'],
    ['/', '\\', '=', '^', '_', '|', '~'],
    ['(', ')', '[', ']', '{', '}', '<', '>'],
    ['.', ',', ':', ';', '"', "'", '`']
  ];

  const emojiKeyboard = [
    ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'],
    ['😉', '😊', '🙂', '😌', '😍', '😘', '😗', '😙', '😚', '😋'],
    ['😛', '😜', '😝', '🤑', '🤗', '🤓', '😎', '🤡', '🤠', '😏'],
    ['😶', '😐', '😑', '😒', '🙄', '😬', '🤥', '😔', '😪', '😴'],
    ['😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵'],
    ['🤯', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '🥱'],
    ['😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥'],
    ['😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤'],
    ['😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '👾', '🤖'],
    ['👹', '👺', '👻', '👽'],
  ];

  const handleKeyPress = (char) => {
    if (char === 'Delete' || char === 'מחק') {
      let updatedText = text;
  
      // Check if the last character is an HTML tag
      if (updatedText.charAt(updatedText.length - 1) === '>') {
        const startIndex = updatedText.lastIndexOf('<');
        updatedText = updatedText.substring(0, startIndex); // Remove the entire tag
      } else {
        updatedText = updatedText.slice(0, -1); // Remove the last character
      }
      setText(updatedText);
      return;
    }
    if (char === 'Space' || char === 'רווח') {
      setText((prevText) => prevText + ' ');
      return;
    }
       else if (selectedColor) {
      setText((prevText) => prevText + `<span style="color: ${selectedColor}">${char}</span>`); // Insert the character with color style
      return;
    }   
    setText((prevText) => prevText + char);
  };

  const handleToggleKeyboard = () => {
    setIsEnglishKeyboard((prevIsEnglish) => !prevIsEnglish);
  };

  const handleToggleCase = () => {
    setIsUppercase((prevIsUppercase) => !prevIsUppercase);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container">
      <div
        className="input-box"
        contentEditable="true"
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
      <div className="keyboards">
        {isEnglishKeyboard ? (
          <>
            <KeyboardLayout letters={isUppercase ? englishCapitalLetters : englishSmallLetters} onKeyPress={handleKeyPress} />
          </>
        ) : (
          <>
            <KeyboardLayout letters={hebrewLetters} onKeyPress={handleKeyPress} />
          </>
        )}
        <div className="buttons">
          <button onClick={handleToggleKeyboard}>
            {isEnglishKeyboard ? 'Hebrew' : 'English'}
          </button>
          {isEnglishKeyboard && <button onClick={handleToggleCase}>
            {isUppercase ? 'Lowercase' : 'Uppercase'}
          </button>}
          <ColorPalette onColorChange={handleColorChange} />
        </div>
        <KeyboardLayout letters={specialCharacters} onKeyPress={handleKeyPress} />
        <KeyboardLayout letters={emojiKeyboard} onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

const KeyboardLayout = ({ letters, onKeyPress }) => {
  return (
    <div className="keyboard">
      {letters.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((char, index) => (
            <button key={index} onClick={() => onKeyPress(char)}>
              {char}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const ColorPalette = ({ onColorChange }) => {
  const colors = ['black','red', 'green', 'blue', 'orange', 'purple']; // Define colors
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


export default App;
