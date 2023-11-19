import React from 'react';
import Table from './PageContent';

function LeaguePage({ leagueName }) {
  return (
    <>
      <div>{ leagueName } stuff</div>
      <div> <Table /> </div>
    </>
  );
}

export default LeaguePage;
