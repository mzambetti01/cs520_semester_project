import { useEffect, useState } from 'react';

const useProcessData = (league) => {
  const [betData, setBetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allLeagues = ["nba", "nhl", "nfl"];
        console.log("fetching");
        let data;
        let players;

        if (league !== "") {
          const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(league)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          data = await response.json();
          players = data.response_object.map(p => [p[0], decodeURIComponent(p[1]), league]);
        } else {
          let responseArr = allLeagues.map(async (l) => {
            const response = await fetch(`http://localhost:5000/players/${encodeURIComponent(l)}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            data = await response.json();
            return data.response_object.map(p => [p[0], decodeURIComponent(p[1]), l]);
          });
          players = await Promise.all(responseArr);
          players = players.flat(1);
        }

        // get bet data for each player
        let betDataArr = players.map(async (x) => {
          const response = await fetch(`http://localhost:5000/player_betting_data/${encodeURIComponent(x[0])}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          data = await response.json();
          return data.response_object;
        });

        let betData = await Promise.all(betDataArr);
        const indxToKeep = [1, 3, 4, 5, 6, 7, 11, 12, 13, 14];
        betData = betData.flat(1).map(d => indxToKeep.map(i => d[i]));
        // merge the two data by playerID
        betData = betData.map((bet) => {
          let p = players.find((player) => player[0] === bet[1]);
          if (p === undefined) {
            return null
          }
          return [p[1], p[2], ...bet];
        }).filter(x => x != null);
        setBetData(betData);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [league]);

  return { betData, loading };
};

export default useProcessData;
