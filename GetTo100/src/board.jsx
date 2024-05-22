import React from 'react';

function Board({ number, steps, isActive, onMove, onGameEnd, score }) {
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

    const newSteps = steps + 1;
    onMove(newNumber, newSteps);

    if (newNumber >= 100) {
      onGameEnd(newSteps);
    }
  };

  return (
    <div>
      <p>Number: {number}</p>
      <p>Steps: {steps}</p>
      <p>Score: {score}</p>
      {isActive && (
        <div>
          <button onClick={() => handleOperation('+')}>+1</button>
          <button onClick={() => handleOperation('-')}>-1</button>
          <button onClick={() => handleOperation('*')}>*2</button>
          <button onClick={() => handleOperation('/')}>/2</button>
        </div>
      )}
    </div>
  );
}

export default Board;
