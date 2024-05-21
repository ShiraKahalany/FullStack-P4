import React, { useEffect, useState } from 'react';
import './home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [topPlayers, setTopPlayers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const playersData = JSON.parse(localStorage.getItem('playersData'));
        console.log(playersData);
        const sortedPlayers = playersData.players.sort((a, b) => b.average - a.average);
        setTopPlayers(sortedPlayers.slice(0, 3));

    }
, []);

  
    return (
        <div className="home-container">
        <h2 className="title">Top 3 Players</h2>
        <ul className="player-list">
          {topPlayers.map((player, index) => (
            <li key={index} className="player-item">
              <h3 className="player-name">Name: {player.username}</h3>
              <h2 className="player-average">Score: {player.average}</h2>
            </li>
          ))}
        </ul>
        <button className="start-button" onClick={() => navigate('/logIn')}>Start</button>
      </div>
    );

}

export default Home;