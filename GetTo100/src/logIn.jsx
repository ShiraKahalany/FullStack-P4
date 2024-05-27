import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

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
        // Check if the username and password are valid
        const passwordRegex = /^\d{4,}$/;
        if (!username) {
            alert('Please enter a username.');
            return;
        }
        if (!password) {
            alert('Please enter a password.');
            return;
        }
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 4 digits long and contain only numbers.');
            return;
        }

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
                    type="text"  // Change to text to allow numeric input restriction
                    id="password" 
                    placeholder="Enter your Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    pattern="\d*"  // Restrict to numeric input
                    maxLength="10"  // Optional: limit maximum length
                />
                <div className="wrap">
                    <button type="submit" className="addButton" onClick={addPlayer}>Add</button>
                </div>
            </div>
            <div className="players-list">
                {activePlayers.map((player, index) => (
                    <div key={index} className="player-box">
                        <p>{player.username}</p>
                    </div>
                ))}
            </div>
            <button className="startButton" onClick={startGame}>Start to Play</button>
        </div>
    );
}

export default LogIn;
