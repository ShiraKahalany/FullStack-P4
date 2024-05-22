import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from './board';

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePlayers = location.state?.activePlayers || [];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const playersData = JSON.parse(localStorage.getItem('playersData')) || { players: [] };
    const initialBoards = activePlayers.map(player => {
      const playerData = playersData.players.find(p => p.username === player.username && p.password === player.password);
      const average = playerData ? playerData.average : 0;
      return {
        player,
        number: Math.floor(Math.random() * 100),
        steps: 0,
        score: average
      };
    });
    setBoards(initialBoards);
  }, [activePlayers]);

  const handleMove = (index, newNumber, newSteps) => {
    const updatedBoards = boards.map((board, i) =>
      i === index ? { ...board, number: newNumber, steps: newSteps } : board
    );

    setBoards(updatedBoards);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % updatedBoards.length);
  };

  const handleGameEnd = (index, steps) => {
    const player = boards[index].player;

    const playersData = JSON.parse(localStorage.getItem('playersData')) || { players: [] };
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

    localStorage.setItem('playersData', JSON.stringify({ players: updatedPlayers }));

    const updatedBoards = boards.map((board, i) => {
      if (i === index) {
        const playerData = updatedPlayers.find(p => p.username === player.username && p.password === player.password);
        const average = playerData ? playerData.average : 0;
        return { ...board, number: Math.floor(Math.random() * 100), steps: 0, score: average };
      }
      return board;
    });

    setBoards(updatedBoards);

    const action = window.confirm(`${player.username} reached 100 in ${steps} steps! Start a new game? Click OK to start a new game or Cancel to exit.`);
    if (action) {
      setBoards(updatedBoards);
    } else {
      const remainingBoards = updatedBoards.filter((_, i) => i !== index);
      setBoards(remainingBoards);

      if (index < currentPlayerIndex) {
        setCurrentPlayerIndex((prevIndex) => (prevIndex - 1) % remainingBoards.length);
      } else if (currentPlayerIndex >= remainingBoards.length) {
        setCurrentPlayerIndex(0);
      }

      if (remainingBoards.length === 0) {
        navigate('/');
      } else {
        setCurrentPlayerIndex((prevIndex) => (prevIndex % remainingBoards.length));
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
              score={board.score}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Game;
