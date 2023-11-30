import { useEffect, useState } from 'react';

// format data to a list of dictionaries of the actual names of fields
const helper = (data) => {
  if (data[0].length != 10) {
    console.log("wrong data to be reformatted")
    return null
  }
  let keys = ["PlayerName", "league", "PlayerID", "ExpectedValue", 
              "OverImpliedProb", "UnderImpliedProb", "OverAdjustedProb",
              "UnderAdjustedProb", "OverAdjustedOdds", "UnderAdjustedOdds"];
  return data.map(d => {
    return keys.reduce((acc, k, i) => {
      acc[k] = d[i];
      return acc;
    }, {}); 
  })
}

// function to format data from backend
const useProcessData = async (league) => {
  const allLeagues = ["nba", "nhl", "nfl"]
  let data;
  let players;
  let betData = [];

  // console.log(league)
  if (league != "") {
    const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(league)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    players = data.response_object.map(p => [p[0], decodeURIComponent(p[1]), league]); 
  } else {
    // list of promisses
    let responseArr = allLeagues.map(async (l) => {
      const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(l)}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data = await response.json();
      return data.response_object.map(p => [p[0], decodeURIComponent(p[1]), l]);
    })
    players = await Promise.all(responseArr);
    players = players.flat(1); 
  }

  // get bet data for each player
  let betDataArr = players.map(async (x) => {
    const response = await fetch(`http://localhost:5000/player_betting_data/${encodeURIComponent(x[0])}`)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    return data.response_object;
  })

  betData = await Promise.all(betDataArr);
  const indxToKeep = [3,4,5,6,10,11,12,13]; // todo: wrong indices
  betData = betData.flat(1).map(d => indxToKeep.map(i => d[i])); // cleaning up the data array

  // merge the two data by playerID 
  betData = betData.map((bet) => {
    // find the player by id in bet, concat the player info to bet info
    let p = players.find((player) => player[0] === bet[0]);
    return [p[1], p[2], ...bet]; // player name, league, the rest
  })

  return helper(betData);
};

export default useProcessData;