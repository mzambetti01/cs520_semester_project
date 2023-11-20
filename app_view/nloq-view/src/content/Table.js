import React from 'react';
import './Table.css'

const findColor = (exp_val, max_val, min_val) => {
  // todo: adjust the interpolation so there;s a mid point color
  let norm = (exp_val - min_val) / (max_val - min_val)

  let r = Math.floor(238 + norm * (125 - 238));
  let g = Math.floor(129 + norm * (226 - 129));
  let b = Math.floor(89 + norm * (209 - 89));

  return `rgb(${r}, ${g}, ${b})`
}

const Table = ({ sort, league, detailed }) => {
  // fake data
  const data = [
    { id: 1, name: 'Item 1', prop_type: 'Category A', exp_val: 0.5, league: 'NBA', overAdj: 1, underAdj: 2 },
    { id: 2, name: 'Item 2', prop_type: 'Category B', exp_val: 0.7, league: 'NBA', overAdj: 4, underAdj: 2 },
    { id: 3, name: 'Item 3', prop_type: 'Category A', exp_val: 0.3, league: 'MLB', overAdj: 1, underAdj: 3 },
  ];

  // Filtering 
  let filteredData = data.filter(
    (item) =>
      league === "" || item.league.toLowerCase() === league.toLowerCase()
  );

  const max_val = filteredData.reduce((acc, x) => acc >= x.exp_val ? acc : x.exp_val, -1);
  const min_val = filteredData.reduce((acc, x) => acc <= x.exp_val ? acc : x.exp_val, 1);

  filteredData = filteredData.slice().sort((a, b) => b.exp_val - a.exp_val);

  return (
    <div className='table-container'>
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Prop Type</th>
          {detailed && <th>Odds</th>}
          {detailed && <th>Adjusted Prob</th>}
          {detailed && <th>Adjusted Odds</th>}
          <th>Expected Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id} style={{backgroundColor:findColor(item.exp_val, max_val, min_val)}}>
            <td>{item.name}</td>
            <td>{item.prop_type}</td>
            {detailed && <td>
              <div className='subrow'> {item.overAdj} </div>
              <div style={{textAlign: "center"}}> {item.underAdj} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.overAdj} </div>
              <div style={{textAlign: "center"}}> {item.underAdj} </div> 
            </td>}
            {detailed && <td>
              <div className='subrow'> {item.overAdj} </div>
              <div style={{textAlign: "center"}}> {item.underAdj} </div> 
            </td>}
            <td>{item.exp_val}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
