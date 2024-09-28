import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const TeamData = () => {
  const location = useLocation(); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const [playersToShow, setPlayersToShow] = useState(10);
  const [letterClass] = useState('text-animate'); 
  
  useEffect(() => {


    const params = new URLSearchParams(location.search);
    const teamValue = params.get('team');
    const playerValue = params.get('playerName');
    const positionValue = params.get('position');

    if (teamValue) {
      axios.get(`http://localhost:8080/v1/players?team=${encodeURIComponent(teamValue)}`)
        .then(response => {
          setPlayerData(response.data);
          setLoading(false);
        })
        .catch(error => { 
          setError(error);
          setLoading(false);
        });
    } else if (playerValue){
      axios.get(`http://localhost:8080/v1/players?playerName=${encodeURIComponent(playerValue)}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } else if (positionValue){
      axios.get(`http://localhost:8080/v1/players?position=${encodeURIComponent(positionValue)}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } 
      else {
      setLoading(false);
    }
  }, [location.search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className={`fade-in ${loading ? 'loading' : ''}`}>
    <div className="table-container">
      <h1 className = "page-title">
        <AnimatedLetters letterClass = {letterClass} strArray={"Player Data".split("")} idx={12}/>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Team</th>
            <th>Position</th>
            <th>Games Played</th>
            <th>Free Throws</th>
            <th>Total Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Fouls</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {playerData.slice(0, playersToShow).map(player => (
            <tr key={player.name}>  
              <td>{player.playerName}</td>
              <td>{player.age}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.gamesPlayed}</td>
              <td>{player.freeThrows}</td>
              <td>{player.totalRebounds}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.blocks}</td>
              <td>{player.fouls}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {playersToShow < playerData.length && (
        <button onClick={() => setPlayersToShow(playersToShow + 10)} style={{ marginTop: '10px', marginBottom: '10px' }} className={`show-more-button ${loading ? 'loading' : ''}`}>
          Show More
        </button>
      )}
    </div>
    </div>
  );
};

export default TeamData;
