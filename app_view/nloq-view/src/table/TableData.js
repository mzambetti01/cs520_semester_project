import React from 'react';

const TableData = ({ filter, page }) => {
  // fake data
  const data = [
    { id: 1, name: 'Item 1', prop_type: 'Category A', exp_val: 0.5 }
  ];

  // Filtering 
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) 
    //   item.category.toLowerCase().includes(filter.toLowerCase())
  );

  const itemsPerPage = 2;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = filteredData.slice(startIndex, endIndex);

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
        {slicedData.map((item) => (
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

export default TableData;
