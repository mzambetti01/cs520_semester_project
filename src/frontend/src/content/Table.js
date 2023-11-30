import React, { useEffect, useState } from 'react';
import './Table.css'
import useProcessData from './data';

const findColor = (exp_val, max_val, min_val) => {
  if (max_val === min_val) {
    return "rgb(238, 129, 89)"
  }
  let norm = (exp_val - min_val) / (max_val - min_val)

  let r = Math.floor(238 + norm * (125 - 238));
  let g = Math.floor(129 + norm * (226 - 129));
  let b = Math.floor(89 + norm * (209 - 89));

  return `rgb(${r}, ${g}, ${b})`
}

const sortingData = (data, sortby) => {
  if (data.length === 0) {
    return data;
  }

  if (typeof data[0][sortby] === 'number') {
    data = data.slice().sort((a, b) => {
      return a[sortby] - b[sortby];
    });
  } else if (typeof data[0][sortby] === 'string') {
    data = data.slice().sort((a, b) => {
      const aValue = String(a[sortby]).toLowerCase(); // Convert to lowercase for case-insensitive sorting
      const bValue = String(b[sortby]).toLowerCase();
  
      return aValue.localeCompare(bValue);
    });
  }
  return data
}

const helper = (data) => {
  if (data.length === 0) {
    return data;
  }

  if (data[0].length != 10) {
    console.log("wrong data to be reformatted")
    return null
  } 

  let keys = ["PlayerName", "league", "PlayerID", "ExpectedValue", 
              "OverImpliedProb", "UnderImpliedProb", "OverAdjustedProb",
              "UnderAdjustedProb", "OverAdjustedOdds", "UnderAdjustedOdds"];
  let id = 0;
  return data.map(d => {
    let o =  keys.reduce((acc, k, i) => {
      acc[k] = d[i];
      return acc;
    }, {}); 
    o["ID"] = id;
    o["ExpectedValue"] = id * 0.5; // mock value for now
    id += 1;
    return o;
  })
}

const Table = ({ sort, league, detailed, search, setMatched }) => {
  const [betData, setBetData] = useState([]);

  // fake data, need to integrate and grab real data
  let data = [
    { PlayerID: 1, PlayerName: 'Item 1', ExpectedValue: 0.5, league: 'NBA', 
    OverImpliedProb: 1, UnderImpliedProb: 2, OverAdjustedProb: 4, 
    UnderAdjustedProb: 3, OverAdjustedOdds: 7, UnderAdjustedOdds: 8 },
    { PlayerID: 2, PlayerName: 'Item 2', ExpectedValue: 0.4, league: 'NBA', 
    OverImpliedProb: 1, UnderImpliedProb: 2, OverAdjustedProb: 4, 
    UnderAdjustedProb: 3, OverAdjustedOdds: 7, UnderAdjustedOdds: 8 },
    { PlayerID: 3, PlayerName: 'Item 7', ExpectedValue: 0.6, league: 'NBA', 
    OverImpliedProb: 1, UnderImpliedProb: 2, OverAdjustedProb: 4, 
    UnderAdjustedProb: 3, OverAdjustedOdds: 7, UnderAdjustedOdds: 8 }
  ];
  
  // grabbing real data
  data = helper(useProcessData(league));

  // Filtering 
  // let tableData = data.filter(
  //   (item) =>
  //     league === "" || item.league.toLowerCase() === league.toLowerCase()
  // );

  const max_val = data.reduce((acc, x) => acc >= x.ExpectedValue ? acc : x.ExpectedValue, -1);
  const min_val = data.reduce((acc, x) => acc <= x.ExpectedValue ? acc : x.ExpectedValue, 1);

  data = data.slice().sort((a, b) => b.ExpectedValue - a.ExpectedValue);

  // if sort specified, sort by specified thing first
  // console.log(sort)
  data = sortingData(data, sort);

  // if searched, set highlight to true
  data = data.map((item) => ({
    ...item,
      highlighted: search === "" ? false : item.PlayerName.toLowerCase().includes(search.toLowerCase())
  }));
  let match = data.reduce((acc, x) => acc || x.highlighted, false)
  setMatched(match)

  return (
    <div className='table-container'>
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          {/* <th>Prop Type</th> */}
          {detailed && <th>Implied Prob</th>}
          {detailed && <th>Adjusted Prob</th>}
          {detailed && <th>Adjusted Odds</th>}
          <th>Expected Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.ID} 
              style={{backgroundColor:findColor(item.ExpectedValue, max_val, min_val)}} 
              className={item.highlighted ? 'highlighted' : ''}>
            <td>{item.PlayerName}</td>
            {/* <td>{item.prop_type}</td> */}
            {detailed && <td>
              <div className='subrow'> {item.OverImpliedProb.toFixed(4)} </div>
              <div style={{textAlign: "center"}}> {item.UnderImpliedProb.toFixed(4)} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.OverAdjustedProb.toFixed(4)} </div>
              <div style={{textAlign: "center"}}> {item.UnderAdjustedProb.toFixed(4)} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.OverAdjustedOdds.toFixed(4)} </div>
              <div style={{textAlign: "center"}}> {item.UnderAdjustedOdds.toFixed(4)} </div> 
            </td>}
            <td>{item.ExpectedValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
