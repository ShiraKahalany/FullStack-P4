import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from './board';

/**
 * Game component represents the main game screen.
 */
function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePlayers = location.state?.activePlayers || [];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    /**
     * Initialize the game boards when active players change.
     */
    const initialBoards = activePlayers.map(player => ({
      player,
      number: Math.floor(Math.random() * 100),
      steps: 0,
    }));
    setBoards(initialBoards);
  }, [activePlayers]);

  /**
   * Handle the move of a player on the board.
   * @param {number} index - The index of the board in the boards array.
   * @param {number} newNumber - The new number to update on the board.
   * @param {number} newSteps - The new number of steps taken on the board.
   */
  const handleMove = (index, newNumber, newSteps) => {
    const updatedBoards = boards.map((board, i) =>
      i === index ? { ...board, number: newNumber, steps: newSteps } : board
    );

    setBoards(updatedBoards);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % updatedBoards.length);
  };

  /**
   * Handle the end of the game for a player.
   * @param {number} index - The index of the board in the boards array.
   * @param {number} steps - The number of steps taken to reach 100.
   */
  const handleGameEnd = (index, steps) => {
    const player = boards[index].player;

    // Update player's scores and average
    const playersData = JSON.parse(localStorage.getItem('playersData'));
    const updatedPlayers = playersData.players.map(p => {
      if (p.username === player.username && p.password === player.password) {
        const updatedScores = [...p.scores, steps];
        const totalScores = updatedScores.reduce((a, b) => a + b, 0);
        const updatedAverage = parseFloat((totalScores / updatedScores.length).toFixed(1));
        return {
          ...p,
          scores: updatedScores,
          average: updatedAverage,
        };
      }
      return p;
    });

    // Update localStorage with the new scores and averages
    localStorage.setItem('playersData', JSON.stringify({ players: updatedPlayers }));

    const action = window.confirm(`${player.username} reached 100 in ${steps} steps! Start a new game? Click OK to start a new game or Cancel to exit.`);
    if (action) {
      // Reset the player's board for a new game
      const updatedBoards = boards.map((board, i) =>
        i === index ? { ...board, number: Math.floor(Math.random() * 100), steps: 0 } : board
      );
      setBoards(updatedBoards);
    } else {
      // Remove the player's board and update the game state
      const updatedBoards = boards.filter((_, i) => i !== index);
      setBoards(updatedBoards);

      // Adjust currentPlayerIndex if necessary
      if (index < currentPlayerIndex) {
        setCurrentPlayerIndex((prevIndex) => (prevIndex - 1) % updatedBoards.length);
      } else if (currentPlayerIndex >= updatedBoards.length) {
        setCurrentPlayerIndex(0);
      }

      // If no players are left, navigate to home
      if (updatedBoards.length === 0) {
        navigate('/');
      } else {
        // Move the turn to the next player if the current player exits
        setCurrentPlayerIndex((prevIndex) => (prevIndex % updatedBoards.length));
      }
    }
  };

  return (
    <>
      <h1>Get to 100</h1>
      <h2>Instructions</h2>
      <p>Click on a number to add it to the current total.</p>
      <p>Keep clicking numbers until you reach 100.</p>
      <div>
        {boards.map((board, index) => (
          <div
            key={index}
            style={{ border: index === currentPlayerIndex ? '2px solid green' : '2px solid grey', margin: '10px', padding: '10px' }}
          >
            <h3>{board.player.username}'s Board</h3>
            <Board
              number={board.number}
              steps={board.steps}
              isActive={index === currentPlayerIndex}
              onMove={(newNumber, newSteps) => handleMove(index, newNumber, newSteps)}
              onGameEnd={(steps) => handleGameEnd(index, steps)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Game;
