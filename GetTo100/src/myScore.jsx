import React, { useState } from 'react';
import './myScore.css'



function MyScore() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [existingPlayers, setExistingPlayers] = useState(() => {
        const playersData = JSON.parse(localStorage.getItem('playersData')) || [];
        return playersData.players || [];
    });
    const [myScore, setMyScore] = useState(0);
    const calcMyScore = () => {
        if (username && password) {
            let existingPlayer = existingPlayers.find(player => player.username === username && player.password === password);
            if (existingPlayer) {
                setMyScore(existingPlayer.scores)
            }
        }

    };
    return (
        <div className="smoky-border">
            <h1>Enter username:</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <h1>Enter password:</h1>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <br></br>
            <br></br>

          <button className="btn-score"onClick={calcMyScore}>My Score:</button>
          <p className="the-score">{myScore}</p>
          {/* <ul>{myScore.map((score) => <li>{score}</li>)} </ul> */}
          {/* <ul className="the-score">
  {myScore.map((score, index) => (
    <li key={index}>{score}</li>
  ))}
</ul> */}
     
            </div>

    );
}

export default MyScore