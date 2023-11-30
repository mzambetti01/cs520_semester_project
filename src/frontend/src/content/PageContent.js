import React, { useState, useEffect } from 'react';
import Table from './Table';
import Footer from '../components/Footer';
import './Page.css'

const PageContent = ({ leagueName }) => {
  const [search, setSearch] = useState('');
  const [searchHolder, setSearchHolder] = useState('');
  const [matched, setMatched] = useState(true);

  const [sortOption, setSortOption] = useState('');
  const [sortDropdown, setSortDropdown] = useState(false)
  const [sortClicked, setSortClicked] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  
  const [detailedView, setDetailedView] = useState(false);
  
  const [filterOption, setFilterOption] = useState('');
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterUndo, setFilterUndo] = useState(false);

  const handleSeachClick = () => {
    // Trigger filtering logic here
    setSearch(searchHolder);
  };

  const handleSortClick = () => {
    // Show options for sorting by player name or expected values
    setSortClicked(!sortClicked);
    if (sortClicked) {
      setSortDropdown(true);
      setFilterDropdown(false);
    } else {
      setSortDropdown(false);
    }
  };

  const handleSortOptionClick = (option) => {
    // Trigger sorting logic based on the selected option
    console.log(`Sorting by ${option} ${sortAsc}`);
    setSortOption(`${option} ${sortAsc}`);
    setSortDropdown(false);
    setSortAsc(!sortAsc)
  };

  const handleFilterClick = () => {
    // Show options for filtering
    setFilterClicked(!filterClicked);
    if (filterClicked && !filterUndo) {
      setFilterDropdown(true);
      setSortDropdown(false);
    } else if (filterClicked && filterUndo) {
      setFilterOption(""); // undo the filtering
      setFilterUndo(false);
    } else {
      setFilterDropdown(false);
    }
  };

  const handleFilterOptionClick = (option) => {
    // Trigger filtering logic based on the selected option
    console.log(`Filter by ${option}`);
    setFilterOption(option);
    setFilterDropdown(false);
    setFilterUndo(true);
  };

  const handleDetailViewClick = () => {
    // Toggle detailed view
    setDetailedView(!detailedView);
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
              <button onClick={() => handleSortOptionClick('PlayerName')}>Player Name</button>
              <button onClick={() => handleSortOptionClick('ExpectedValue')}>Expected Values</button>
            </div>
          )}</button>
          <button onClick={handleFilterClick}> {filterUndo ? 'Undo Filter' : "Filter" }
          {filterDropdown && (
            <div className='sort-options'>
              Market to show:
              <button onClick={() => handleFilterOptionClick('assists')}>Assist</button>
              <button onClick={() => handleFilterOptionClick('blocks')}>Blocks</button>
              <button onClick={() => handleFilterOptionClick('points')}>Points</button>
              <button onClick={() => handleFilterOptionClick('rebounds')}>Rebounds</button>
              <button onClick={() => handleFilterOptionClick('steals')}>Steals</button>
            </div>
          )}</button>
          <button onClick={handleDetailViewClick}>
            {detailedView ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <Table sort={sortOption} league={ leagueName } detailed={ detailedView } search={ search } setMatched={setMatched} filter={filterOption}/>
      </div>
      
      <div> <Footer /> </div>
    </div>
  );
};

export default PageContent;