import React from 'react';

function Board({ number, steps, isActive, onMove, onGameEnd }) {
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
    onMove(newNumber, newSteps); // Pass the turn after the operation

    if (newNumber === 100) {
      onGameEnd(newSteps); // Notify parent component when reaching 100
    }
  };

  return (
    <div>
      <p>Number: {number}</p>
      <p>Steps: {steps}</p>
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
