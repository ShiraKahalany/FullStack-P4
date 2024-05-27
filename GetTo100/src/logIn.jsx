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
            <h1>Add Players</h1>
            <div className="form-group">
                <label htmlFor="userName">Username:</label>
                <input 
                    type="text" 
                    id="userName" 
                    placeholder="Enter your Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <div className="wrap">
                    <button type="submit" class="addButton" onClick={addPlayer}>Add</button>
                </div>
            </div>
            <div className="players-list">
                {activePlayers.map((player, index) => (
                    <div class="player" key={index} className="player-box">
                        <p>{player.username}</p>
                    </div>
                ))}
            </div>
            <button class = "startButton" onClick={startGame}>Start to Play</button>
        </div>
    );
}

export default LogIn;
