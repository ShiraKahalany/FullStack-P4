import React, { useState } from 'react';

function Board() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100));
  const [steps, setSteps] = useState(0);

  const handleOperation = (operation) => {
    let newNumber;
    switch (operation) {
      case '+':
        newNumber = number + 1;
        break;
      case '-':
        newNumber = number - 1;
        break;
      case '*':
        newNumber = number * 2;
        break;
      case '/':
        newNumber = Math.floor(number / 2); 
        break;
      default:
        newNumber = number;
    }
    setNumber(newNumber);
    setSteps(steps + 1);
  };

  return (
    <div>
      <p>Number: {number}</p>
      <div>
        <button onClick={() => handleOperation('+')}>+1</button>
        <button onClick={() => handleOperation('-')}>-1</button>
        <button onClick={() => handleOperation('*')}>*2</button>
        <button onClick={() => handleOperation('/')}>/2</button>
      </div>
      <p>Steps: {steps}</p>
    </div>
  );
}

export default Board;
