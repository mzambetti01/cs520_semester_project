import React, { useState, useEffect } from 'react';

// function to format data from backend
const processData = ({ league }) => {
  const [playerIdData, setPlayerIdData] = useState([]);
  const [betData, setBetData] = useState([]);

  useEffect(() => {
    const fetchPlayerID = async () => {
      try {
        const response = await fetch(`http://localhost:5000/players/${league}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlayerIdData(data.response_object);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlayerID();
  }, [league]);

  let players = playerIdData.map(p => p.PlayerID);

  useEffect(() => {
    const fetchBetData = async () => {
      try {
        const betDataPromises = players.map(async (playerId) => {
          const response = await fetch(`http://localhost:5000/player_betting_data/${playerId}`);
          
          if (!response.ok) {
            throw new Error(`Network response was not ok for PlayerID ${playerId}`);
          }
  
          const data = await response.json();
          return data.response_object;
        });
  
        // Wait for all promises to resolve
        const betDataArr = await Promise.all(betDataPromises);
        setBetData(betDataArr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchBetData();
  }, [players]);

  return betData;
};

export default processData;