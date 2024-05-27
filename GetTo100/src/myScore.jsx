import React, { useState } from 'react';
import './myScore.css';

function MyScore() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [existingPlayers, setExistingPlayers] = useState(() => {
        const playersData = JSON.parse(localStorage.getItem('playersData')) || [];
        return playersData.players || [];
    });
    const [myScore, setMyScore] = useState([]);
    const [average, setAverage] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const calcMyScore = () => {
        if (username && password) {
            let existingPlayer = existingPlayers.find(player => player.username === username && player.password === password);
            if (existingPlayer) {
                setMyScore(existingPlayer.scores);
                setAverage(existingPlayer.average);
                setLoggedIn(true);
            }
        }
    };

    return (
        <div className="smoky-border">
            {loggedIn ? (
                <div>
                    <h2 class="welcome">Welcome {username}</h2>
                    <p class="score-p">You have played {myScore.length} games and your scores:</p>
                    <ul className="the-score-list">
                        {myScore.map((score, index) => (
                            <li key={index}>Game {index + 1}: <span class="boldscore">{score}</span></li>
                        ))}
                    </ul>
                    <p class="score-p">Your average score is: <span class="boldscore">{average}</span></p>
                </div>
            ) : (
                <div>
                    <h2>Enter username:</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <h2>Enter password:</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <button className="btn-score" onClick={calcMyScore}>My Score</button>
                </div>
            )}
        </div>
    );
}

export default MyScore;
