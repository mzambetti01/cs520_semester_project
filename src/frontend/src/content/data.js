// format data to a list of dictionaries of the actual names of fields
const helper = (data) => {
  if (data[0].length != 9) {
    console.log("wrong data to be reformatted")
    return null
  }
  
}

// function to format data from backend
const useProcessData = async (league) => {
  const allLeagues = ["nba", "nhl", "nfl"]
  let data;
  let resPlayerData = [];
  let betData = [];

  // console.log(league)
  if (league != "") {
    const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(league)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    resPlayerData = data.response_object; 
  } else {
    // list of promisses
    let responseArr = allLeagues.map(async (l) => {
      const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(l)}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data = await response.json();
      return data.response_object;
    })
    resPlayerData = await Promise.all(responseArr);
    resPlayerData = resPlayerData.flat(1); 
  }

  let players = resPlayerData.map(p => [p[0], decodeURIComponent(p[1])]);
  console.log(players);

  let betDataArr = players.map(async (x) => {
    const response = await fetch(`http://localhost:5000/player_betting_data/${encodeURIComponent(x[0])}`)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    return data.response_object;
  })

  betData = await Promise.all(betDataArr);
  console.log(betData.flat(1));
  const indxToKeep = [3,4,5,6,10,11,12,13]; // todo: wrong indices
  betData = betData.flat(1).map(d => indxToKeep.map(i => d[i])); // cleaning up the data array

  // merge the two data by playerID 
  betData = betData.map((bet) => {
    // find the player by id in bet, concat the player info to bet info
    let p = players.find((player) => player[0] === bet[0]);
    return [p[1], ...bet];
  })

  console.log(betData);



  return betData;
};

export default useProcessData;