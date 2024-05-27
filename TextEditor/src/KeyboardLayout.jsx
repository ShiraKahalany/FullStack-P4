import React from 'react';
import './css/KeyboardLayout.css';

const englishCapitalLetters = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const englishSmallLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const hebrewLetters = [
  ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'],
  ['כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר'],
  ['ש', 'ת', 'ם', 'ן', 'ף', 'ץ']
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
  ['👹', '👺', '👻', '👽']
];

const KeyboardLayout = ({ letters, onKeyPress }) => (
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

export { englishCapitalLetters, englishSmallLetters, hebrewLetters, specialCharacters, emojiKeyboard };
export default KeyboardLayout;
