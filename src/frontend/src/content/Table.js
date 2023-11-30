import React, { useState } from 'react';
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

const Table = ({ sort, league, detailed, search, setMatched }) => {
  // fake data, need to integrate and grab real data
  const data = [
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
  useProcessData("nba");
  // console.log(tableData);

  // Filtering 
  let tableData = data.filter(
    (item) =>
      league === "" || item.league.toLowerCase() === league.toLowerCase()
  );

  const max_val = tableData.reduce((acc, x) => acc >= x.ExpectedValue ? acc : x.ExpectedValue, -1);
  const min_val = tableData.reduce((acc, x) => acc <= x.ExpectedValue ? acc : x.ExpectedValue, 1);

  tableData = tableData.slice().sort((a, b) => b.ExpectedValue - a.ExpectedValue);

  // if sort specified, sort by specified thing first
  // console.log(sort)
  tableData = sortingData(tableData, sort);

  // if searched, set highlight to true
  tableData = tableData.map((item) => ({
    ...item,
      highlighted: search === "" ? false : item.name.toLowerCase().includes(search.toLowerCase())
  }));
  let match = tableData.reduce((acc, x) => acc || x.highlighted, false)
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
        {tableData.map((item) => (
          <tr key={item.PlayerID} 
              style={{backgroundColor:findColor(item.ExpectedValue, max_val, min_val)}} 
              className={item.highlighted ? 'highlighted' : ''}>
            <td>{item.PlayerName}</td>
            {/* <td>{item.prop_type}</td> */}
            {detailed && <td>
              <div className='subrow'> {item.OverImpliedProb} </div>
              <div style={{textAlign: "center"}}> {item.UnderImpliedProb} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.OverAdjustedProb} </div>
              <div style={{textAlign: "center"}}> {item.UnderAdjustedProb} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.OverAdjustedOdds} </div>
              <div style={{textAlign: "center"}}> {item.UnderAdjustedOdds} </div> 
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
