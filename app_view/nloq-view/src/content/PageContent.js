import React, { useState, useEffect } from 'react';
import Table from './Table';
import Footer from '../components/Footer';
import './Page.css'

const PageContent = ({ leagueName }) => {
  const [search, setSearch] = useState('');
  const [searchHolder, setSearchHolder] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortDropdown, setSortDropdown] = useState(false)
  const [detailedView, setDetailedView] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);
  const [matched, setMatched] = useState(true);

  const handleSeachClick = () => {
    // Trigger filtering logic here
    setSearch(searchHolder);
  };

  const handleSortClick = () => {
    // Show options for sorting by player name or expected values
    setSortClicked(!sortClicked);
    if (sortClicked) {
      setSortDropdown(true)
    } else {
      setSortDropdown(false)
    }
  };

  const handleSortOptionClick = (option) => {
    // Trigger sorting logic based on the selected option
    console.log(`Sorting by ${option}`);
    setSortOption(option);
    setSortDropdown(false)
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
          <div className={`search ${!matched ? 'no-match' : ''}`}>
            <input
              type="text"
              placeholder="Search..."
              value={searchHolder}
              onChange={(e) => setSearchHolder(e.target.value)}
            />
            <button onClick={handleSeachClick}>Search</button>
          </div>
          <button onClick={handleSortClick}>Sort
          {sortDropdown && (
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
        
        <Table sort={sortOption} league={ leagueName } detailed={ detailedView } search={ search } setMatched={setMatched}/>
      </div>
      
      <div> <Footer /> </div>
    </div>
  );
};

export default PageContent;