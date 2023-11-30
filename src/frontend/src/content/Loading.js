import React from 'react';
import loadingGif from '../imgs/bongo-cat.gif';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <img src={loadingGif} alt="Loading..." />
      <p style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>Loading...</p>
    </div>
  );
};

export default Loading;