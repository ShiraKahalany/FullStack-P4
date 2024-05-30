import React, { useState } from 'react';
import './App.css';
import { englishCapitalLetters, englishSmallLetters, hebrewLetters, specialCharacters, emojiKeyboard } from './KeyboardLayout';
import KeyboardLayout from './KeyboardLayout';
import ColorPalette from './colorPalette';
import TextEditor from './TextEditor';
import FontFamilySelector from './FontFamilySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [isEnglishKeyboard, setIsEnglishKeyboard] = useState(true);
  const [isUppercase, setIsUppercase] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [textSize, setTextSize] = useState(16);
  const [charSize, setCharSize] = useState(null);
  const [fontFamily, setFontFamily] = useState(null);

  const saveHistory = () => {
    setHistory((prevHistory) => [
      {
        text,
        selectedColor,
        textSize,
        charSize,
        fontFamily,
      },
      ...prevHistory
    ].slice(0, 10));
  };

  const deleteKey = () => {
    saveHistory();
    let updatedText = text;
    if (updatedText.charAt(updatedText.length - 1) === '>') {
      const startIndex = updatedText.lastIndexOf('<');
      updatedText = updatedText.substring(0, startIndex);
    } else {
      updatedText = updatedText.slice(0, -1);
    }
    setText(updatedText);
  };

  const handleKeyPress = (char) => {
    saveHistory();
    let newChar = char;
    let style = '';

    if (selectedColor) style += `color: ${selectedColor};`;
    if (charSize) style += `font-size: ${charSize}px;`;
    if (fontFamily) style += `font-family: ${fontFamily};`;

    if (style) newChar = `<span style="${style}">${char}</span>`;
    else newChar = `<span>${char}</span>`;

    setText((prevText) => prevText + newChar);
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

  const handleFontFamilyChange = (font) => {
    setFontFamily(font);
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => prevSize + 2);
  };

  const decreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(prevSize - 2, 10));
  };

  const increaseCharSize = () => {
    setCharSize((prevSize) => (prevSize ? prevSize + 2 : textSize + 2));
  };

  const decreaseCharSize = () => {
    setCharSize((prevSize) => Math.max(prevSize ? prevSize - 2 : textSize - 2, 10));
  };

  const applyFontFamilyToAll = (font) => {
    saveHistory();
    const updatedText = text.replace(/<span(.*?)>(.*?)<\/span>/g, (match, p1, p2) => {
      let newStyles = `font-family: ${font};`;
      let updatedSpan = p1;

      if (p1.includes('style="')) {
        updatedSpan = p1.replace(/style="(.*?)"/, (styleMatch, styleContent) => {
          const cleanedStyles = styleContent.replace(/font-family:[^;]+;/, '').trim();
          return `style="${cleanedStyles} ${newStyles}"`.trim();
        });
      } else {
        updatedSpan = `${p1} style="${newStyles}"`;
      }

      return `<span${updatedSpan}>${p2}</span>`;
    });
    setText(updatedText);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[0];
      setText(previousState.text);
      setSelectedColor(previousState.selectedColor);
      setTextSize(previousState.textSize);
      setCharSize(previousState.charSize);
      setFontFamily(previousState.fontFamily);
      setHistory((prevHistory) => prevHistory.slice(1));
    }
  };

  return (
    <>
      <TextEditor text={text} onChange={setText} textSize={textSize} />
      <div className="container">
        <div className="keyboards">
          <ColorPalette onColorChange={handleColorChange} />
          <button onClick={handleUndo}><FontAwesomeIcon icon={faUndo} /></button>
          <FontFamilySelector onFontFamilyChange={handleFontFamilyChange} />
          {isEnglishKeyboard ? (
            <KeyboardLayout letters={isUppercase ? englishCapitalLetters : englishSmallLetters} onKeyPress={handleKeyPress} />
          ) : (
            <KeyboardLayout letters={hebrewLetters} onKeyPress={handleKeyPress} />
          )}
          <div className="buttons">
            <button onClick={deleteKey}>Delete</button>
            <button onClick={() => { saveHistory(); setText((prevText) => prevText + ' ') }}>Space</button>
            <button onClick={handleToggleKeyboard}>
              {isEnglishKeyboard ? 'Hebrew' : 'English'}
            </button>
            {isEnglishKeyboard && (
              <button onClick={handleToggleCase}>
                {isUppercase ? 'Lowercase' : 'Uppercase'}
              </button>
            )}
            <button onClick={increaseCharSize}>A</button>
            <button onClick={decreaseCharSize}>a</button>
          </div>
          <div className="generalbuttons">
            <button onClick={() => { saveHistory(); setText('') }}>Clear All</button>
            <button onClick={() => { saveHistory(); setText(text.toUpperCase()) }}>Upper All</button>
            <button onClick={() => { saveHistory(); setText(text.toLowerCase()) }}>Lower All</button>
            <button onClick={increaseTextSize}>AA</button>
            <button onClick={decreaseTextSize}>aa</button>
            <FontFamilySelector onFontFamilyChange={applyFontFamilyToAll} />
          </div>
          <KeyboardLayout letters={specialCharacters} onKeyPress={handleKeyPress} />
          <KeyboardLayout letters={emojiKeyboard} onKeyPress={handleKeyPress} />
        </div>
      </div>
    </>
  );
}

export default App;
