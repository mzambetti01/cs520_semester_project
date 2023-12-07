import React from 'react';

const ResourcePage = () => {
    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
          <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '5px', color: '#333' }}>Understanding The Analysis</h2>
    
          <div>
            <h3>Implied Probability</h3>
            <p>
              This is calculated using the sports book’s odds. It represents the probability that the sports book assigns, incorporating a certain percentage on top of the true probability.
            </p>
          </div>
    
          <div>
            <h3>Vigorish/Overage</h3>
            <p>
              This is a small percentage (usually around 0-10%) added as guaranteed profit onto the true odds/probability of an event.
            </p>
          </div>
    
          <div>
            <h3>True Probability</h3>
            <p>
              This is the probability of the bet when the vigorish is subtracted from the total percentage.
            </p>
          </div>
    
          <div>
            <h3>True Odds</h3>
            <p>
              Using the true probability, we can determine the actual odds of either side of the bet.
            </p>
          </div>
    
          <div>
            <h3>Expected Value</h3>
            <p>
              This is the expected percentage of profit on a bet. It is calculated by multiplying the expected winnings by the true probability and then subtracting the value of the potential loss based on the probability of the bet losing.
            </p>
          </div>
    
          <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '5px', color: '#333' }}>More Resources</h2>
    
          <ul>
            <li>
              Another Website Explaining the Topics Above: <a href="https://oddsjam.com/" style={{ color: '#007bff' }}>OddsJam</a>
            </li>
            <li>
              A website with a calculator for all these values: <a href="https://oddsjam.com/" style={{ color: '#007bff' }}>OddsJam Calculator</a>
            </li>
          </ul>
    
          <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '5px', color: '#333' }}>Gambling Addiction Resources</h2>
    
          <ul>
            <li>
              Website: <a href="https://gamblinghelplinema.org/" style={{ color: '#007bff' }}>Gambling Help Line MA</a>
            </li>
            <li>
              Phone Number: <span style={{ color: '#007bff' }}>(800) 327-5050</span>
            </li>
          </ul>
        </div>
      );
    };

export default ResourcePage;
