import React, { useState } from 'react';
import Table from './Table';
import Footer from '../components/Footer';
import './Page.css'

const PageContent = ({ leagueName }) => {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [detailedView, setDetailedView] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSeachClick = () => {
    // Trigger filtering logic here
    console.log('searching...');
  };

  const handleSortClick = () => {
    // Show options for sorting by player name or expected values
    setSortClicked(!sortClicked);
    if (!sortClicked) {
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
        <div className='buttons-container'>
          <div className='search'>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            /> 
            <button onClick={handleSeachClick}>Search</button>
          </div>
          <button onClick={handleSortClick}>Sort
          {sortClicked && (
            <div className='sort-options'>
              Sort by:
              <button onClick={() => handleSortOptionClick('name')}>Player Name</button>
              <button onClick={() => handleSortOptionClick('exp_val')}>Expected Values</button>
            </div>
          )}</button>
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