import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import playerData from "../../data/player.json"; 

const Players = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    });  

    useEffect(() => {
      const filtered = playerData.players.filter(player =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderPlayers = (players) => {
        return (
          <div className="images-player">
          {players.map((player, idx) => (
            <div key={idx} className="image-box">
              <img src={player.uri} alt={player.name} className="player-image" />
                <div className="content">
                <p className="title">{player.name}</p>
                <Link className="btn" to={`/data?playerName=${encodeURIComponent(player.name)}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
        );
    };

    return (
        <>
          <div className="container players-page">
            <h1 className="page-title">
              <AnimatedLetters letterClass= {letterClass} strArray={"Players".split("")} idx={15} />
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for players"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div>{renderPlayers(filteredPlayers)}</div>
          </div>
          <Loader type="pacman" />
        </>
    );
};

export default Players;
