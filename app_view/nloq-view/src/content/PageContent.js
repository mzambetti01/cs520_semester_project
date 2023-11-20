import React, { useState } from 'react';
import Table from './Table';
import Footer from '../components/Footer';
import './Page.css'

const PageContent = ({ leagueName }) => {
  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [detailedView, setDetailedView] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterClick = () => {
    // Trigger filtering logic here
    console.log('Filtering...');
  };

  const handleSortClick = () => {
    // Show options for sorting by player name or expected values
    setSortClicked(!sortClicked);
    if (sortClicked) {
      setSortOption(null);
    }
    console.log('Sorting...');
  };

  const handleSortOptionClick = (option) => {
    // Trigger sorting logic based on the selected option
    console.log(`Sorting by ${option}`);
    setSortOption(option);
  };

  const handleDetailViewClick = () => {
    // Toggle detailed view
    setDetailedView(!detailedView);
  };

  const handleRefreshClick = () => {
    // Trigger data refresh logic here
    console.log('Refreshing...');
  };

  return (
    <div className='main'>
      <div className='wrapper'>
        <div className='content-head'>
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={handleFilterChange}
          /> 
          <button onClick={handleFilterClick}>Search</button>
          <button onClick={handleSortClick}>Sort</button>
          {sortClicked && (
            <div>
              Sort by:
              <button onClick={() => handleSortOptionClick('name')}>Player Name</button>
              <button onClick={() => handleSortOptionClick('exp_val')}>Expected Values</button>
            </div>
          )}
          <button onClick={handleDetailViewClick}>
            {detailedView ? 'Hide Details' : 'Show Details'}
          </button>
          <button onClick={handleRefreshClick}>Refresh</button>
        </div>

        <Table sort={sortOption} league={ leagueName } detailed={ detailedView }/>
      </div>
      
      <div> <Footer /> </div>
    </div>
  );
};

export default PageContent;