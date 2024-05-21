import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Game from './game';
import './login.css';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activePlayers, setActivePlayers] = useState([]);
    const [existingPlayers, setExistingPlayers] = useState(() => {
        const playersData = JSON.parse(localStorage.getItem('playersData')) || [];
        return playersData.players || [];
    });
    const navigate = useNavigate();

    const startGame = () => {
        localStorage.setItem('playersData', JSON.stringify({ players: existingPlayers }));
        // Navigate to the game or next step
        navigate('/game', { state: { activePlayers } });
    };

    const addPlayer = () => {
        if (username && password) {
            let existingPlayer = existingPlayers.find(player => player.username === username && player.password === password);

            if (existingPlayer) {
                setActivePlayers([...activePlayers, existingPlayer]);
            } else {
                const newPlayer = {
                    username,
                    password,
                    scores: [],
                    average: 0
                };
                setActivePlayers([...activePlayers, newPlayer]);
                const updatedPlayers = [...existingPlayers, newPlayer];
                setExistingPlayers(updatedPlayers);
                localStorage.setItem('playersData', JSON.stringify({ players: updatedPlayers }));
            }

            setUsername('');
            setPassword('');
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div className="login-container">
            <h2>Add Players</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={addPlayer}>Add</button>
            </div>
            <div className="players-list">
                {activePlayers.map((player, index) => (
                    <div key={index} className="player-box">
                        <p>{player.username}</p>
                    </div>
                ))}
            </div>
            <button onClick={startGame}>Start to Play</button>
        </div>
    );
}

export default LogIn;
