import React, { useState } from 'react';
import TableData from './TableData';

const Table = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={handleFilterChange}
      />
      <TableData filter={filter}/>
    </div>
  );
};

export default Table;