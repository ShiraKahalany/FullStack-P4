import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from './board';
import AlertDialog from './dialog';

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePlayers = location.state?.activePlayers || [];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [boards, setBoards] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});

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
    setDialogData({ username: player.username, steps });
    setOpenDialog(true);
  };

  const handleDialogClose = (startNewGame) => {
    setOpenDialog(false);
    if (startNewGame) {
      const updatedBoards = boards.map((board, i) => ({
        ...board,
        number: Math.floor(Math.random() * 100),
        steps: 0,
      }));
      setBoards(updatedBoards);
    } else {
      const remainingBoards = boards.filter((_, i) => i !== currentPlayerIndex);
      setBoards(remainingBoards);

      if (currentPlayerIndex >= remainingBoards.length) {
        setCurrentPlayerIndex(0);
      } else if (currentPlayerIndex > 0) {
        setCurrentPlayerIndex(currentPlayerIndex - 1);
      }

      if (remainingBoards.length === 0) {
        navigate('/');
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
        <AlertDialog open={openDialog} onClose={handleDialogClose} dialogData={dialogData} />
      </div>
    </>
  );
}

export default Game;
