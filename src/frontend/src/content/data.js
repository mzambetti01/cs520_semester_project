import React, { useState, useEffect } from 'react';

// function to format data from backend
const useProcessData = async (league) => {
  const [playerIdData, setPlayerIdData] = useState([]);
  const [betData, setBetData] = useState([]);
  const allLeagues = ["nba", "nhl", "nfl"]

  // console.log(league)
  const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(league)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data.response_object)

  // useEffect(() => {
  //   const fetchPlayerID = async () => {
  //     try {
  //       if (league === '') {
  //         const playerPromises = allLeagues.map(async (l) => {
  //           const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(l)}`);
  //           if (!response.ok) {
  //             throw new Error(`Network response was not ok for league: ${l}`);
  //           }

  //           const data = await response.json();
  //           return data.response_object;
  //         })

  //         const playerDataArr = await Promise.all(playerPromises);
          
  //         setPlayerIdData(playerDataArr);

  //       } else {
  //         // Fetch data for a specific league
  //         const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(league)}`);
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         setPlayerIdData(data.response_object);
  //       }
        
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchPlayerID();
  // }, [league]);

  let players = data.response_object.map(p => p[0]);
  console.log(players)

  // useEffect(() => {
  //   const fetchBetData = async () => {
  //     try {
  //       const betDataPromises = players.map(async (playerId) => {
  //         const response = await fetch(`http://localhost:5000/player_betting_data/${encodeURIComponent(playerId)}`);
          
  //         if (!response.ok) {
  //           throw new Error(`Network response was not ok for PlayerID ${encodeURIComponent(playerId)}`);
  //         }
  
  //         const data = await response.json();
  //         return data.response_object;
  //       });
  
  //       // Wait for all promises to resolve
  //       const betDataArr = await Promise.all(betDataPromises);
  //       setBetData(betDataArr);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchBetData();
  // }, [players]);

  // merge the two data by playerID 
  let finalData = playerIdData.map(x1 => {
    const x2 = betData.find(x => x.PlayerID === x1.playerId);
    return {
      ...x1,
      ...x2
    }
  })

  // remove unecessary fields
  // id, PlayerID, PlayerName, ExpectedValue, OverImpliedProb, UnderImpliedProb, OverAdjustedProb, UnderAdjustedProb
  // OverAdjustedOdds, UnderAdjustedOdds <- nesaccery fields
  const keys_necessary = ["PlayerID", "PlayerName", "ExpectedValue", 
    "OverImpliedProb", "UnderImpliedProb", 
    "OverAdjustedProb", "UnderAdjustedProb",
    "OverAdjustedOdds", "UnderAdjustedOdds"]

  finalData = finalData.map(x => {
    return Object.fromEntries(
      Object.entries(x).filter(([key]) => keys_necessary.includes(key))
    );
  })

  // console.log(finalData)

  return finalData;
};

export default useProcessData;