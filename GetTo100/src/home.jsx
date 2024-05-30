import React, { useEffect, useState } from 'react';
import './css/home.css'
import { useNavigate } from 'react-router-dom';


function Home() {
    const [topPlayers, setTopPlayers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
      const playersData = JSON.parse(localStorage.getItem('playersData'));
      const filteredPlayers = playersData.players.filter(player => player.average !== 0);
      const sortedPlayers = filteredPlayers.sort((a, b) => a.average - b.average);
      const topThreePlayers = sortedPlayers.slice(0, 3);

      setTopPlayers(topThreePlayers);
  }, []);

  
    return (
        <div className="homebody">
        <div className="header-container">
        <button className="profile-button" onClick={() => navigate('/myScore')}>My Score</button>
        <h1 className="title">Top 3 Players</h1>
        </div>
        <ul className="player-list">
          {topPlayers.map((player, index) => (
            <li key={index} className="player-item">
              <h3 className="player-name">Name: {player.username}</h3>
              <h2 className="player-average">Score: {player.average}</h2>
            </li>
          ))}
        </ul>
        <button className="start-button" onClick={() => navigate('/logIn')}>Start</button>
        <br></br>

      </div>
    );

}

export default Home;