import React, { useEffect, useState } from 'react';
import './Table.css'
import { useData } from './DataProvider';
import SubRow from './SubEntry';

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

  const [sortField, sortAsc] = sortby.split(' ');

  if (typeof data[0][sortField] === 'number') {
    data = data.slice().sort((a, b) => {
      const comparison = a[sortField] - b[sortField];
      return sortAsc === 'true' ? comparison : -comparison;
    });
  } else if (typeof data[0][sortField] === 'string') {
    data = data.slice().sort((a, b) => {
      const aValue = String(a[sortField]).toLowerCase(); // Convert to lowercase for case-insensitive sorting
      const bValue = String(b[sortField]).toLowerCase();
  
      const comparison = aValue.localeCompare(bValue);
      return sortAsc === 'false' ? comparison : -comparison;
    });
  }
  return data
}

const Table = ({ sort, league, detailed, search, setMatched, filter }) => {
  const [clickedRowIndex, setClickedRowIndex] = useState(null);

  const handleClick = (index) => {
    setClickedRowIndex(index === clickedRowIndex ? null : index);
  };

  // grabbing real data
  let {data, loading} = useData();
  console.log(data);
  data = data.filter(d => d.league === league || league === "");

  const max_val = data.reduce((acc, x) => acc >= x.ExpectedValue ? acc : x.ExpectedValue, -1000);
  const min_val = data.reduce((acc, x) => acc <= x.ExpectedValue ? acc : x.ExpectedValue, 1000);

  data = data.slice().sort((a, b) => b.ExpectedValue - a.ExpectedValue);

  // if sort specified, sort by specified thing first
  data = sortingData(data, sort);

  // filtering logic
  data = data.filter((item) => filter === "" || item.Market === filter);

  // if searched, set highlight to true
  data = data.map((item) => ({
    ...item,
      highlighted: search === "" ? false : item.PlayerName.toLowerCase().includes(search.toLowerCase())
  }));
  let match = data.reduce((acc, x) => acc || x.highlighted, false) || search === "";
  setMatched(match)

  return (
    <div className='table-container'>
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          {<th>Market</th>}
          {detailed && <th>Implied Prob</th>}
          {detailed && <th>Adjusted Prob</th>}
          {detailed && <th>Adjusted Odds</th>}
          <th>Expected Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
            <React.Fragment key={item.ID}>
              <tr
                key={item.ID}
                style={{ backgroundColor: findColor(item.ExpectedValue, max_val, min_val) }}
                className={item.highlighted ? 'highlighted' : ''}
                onClick={() => handleClick(index)}
              >
                <td>{item.PlayerName}</td>
                {<td>{item.Market}</td>}
                {detailed && (
                  <td>
                    <div className='subrow'> {item.OverImpliedProb.toFixed(4)} </div>
                    <div style={{ textAlign: 'center' }}> {item.UnderImpliedProb.toFixed(4)} </div>
                  </td>
                )}
                {detailed && (
                  <td>
                    <div className='subrow'> {item.OverAdjustedProb.toFixed(4)} </div>
                    <div style={{ textAlign: 'center' }}> {item.UnderAdjustedProb.toFixed(4)} </div>
                  </td>
                )}
                {detailed && (
                  <td>
                    <div className='subrow'> {item.OverAdjustedOdds.toFixed(4)} </div>
                    <div style={{ textAlign: 'center' }}> {item.UnderAdjustedOdds.toFixed(4)} </div>
                  </td>
                )}
                <td>{item.ExpectedValue.toFixed(4)}</td>
              </tr>

              {index === clickedRowIndex && (
                <tr className="sub-table-wrapper">
                  <td colSpan= { detailed ? 6 : 4 }>
                    {/* subTable */}
                    <table className="mini-table">
                      <thead>
                        <tr>
                          <th>Sportsbook</th>
                          <th>Player</th>
                          <th>Market</th>
                          {detailed && <th>Implied Prob</th>}
                          {detailed && <th>Adjusted Prob</th>}
                          {detailed && <th>Adjusted Odds</th>}
                          <th>Expected Value</th>
                        </tr>
                      </thead>
                      <tbody>
                      {item.list.map(sub => (
                       <tr
                          key={sub.ID}
                          style={{ backgroundColor: findColor(sub.ExpectedValue, max_val, min_val) }}
                          className={item.highlighted ? 'highlighted' : ''}
                        >
                          <td>{sub.BookName}</td>
                          <td>{sub.PlayerName}</td>
                          <td>{sub.Market}</td>
                          {detailed && (
                            <td>
                              <div className='subrow'> {sub.OverImpliedProb.toFixed(4)} </div>
                              <div style={{ textAlign: 'center' }}> {sub.UnderImpliedProb.toFixed(4)} </div>
                            </td>
                          )}
                          {detailed && (
                            <td>
                              <div className='subrow'> {sub.OverAdjustedProb.toFixed(4)} </div>
                              <div style={{ textAlign: 'center' }}> {sub.UnderAdjustedProb.toFixed(4)} </div>
                            </td>
                          )}
                          {detailed && (
                            <td>
                              <div className='subrow'> {sub.OverAdjustedOdds.toFixed(4)} </div>
                              <div style={{ textAlign: 'center' }}> {sub.UnderAdjustedOdds.toFixed(4)} </div>
                            </td>
                          )}
                          <td>{sub.ExpectedValue.toFixed(4)}</td>
                        </tr>))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        }
      </tbody>
    </table>
    </div>
  );
};

export default Table;
