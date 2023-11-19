import React from 'react';
import './Page.css'

const Table = ({ filter, league, page }) => {
  // fake data
  const data = [
    { id: 1, name: 'Item 1', prop_type: 'Category A', exp_val: 0.5, league: 'League A' },
    { id: 2, name: 'Item 2', prop_type: 'Category B', exp_val: 0.7, league: 'League B' },
    { id: 3, name: 'Item 3', prop_type: 'Category A', exp_val: 0.3, league: 'League A' },
  ];

  // Filtering 
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) 
    //   item.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Prop Type</th>
          <th>Expected Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.prop_type}</td>
            <td>{item.exp_val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
