import React from 'react';
import R from 'ramda'
import Table from './table/Table';
import Card from './card/Card';
import Statistics from './statistics/Statistics';
import mockData from '../mockData';


const App = () => {

  let tags =
  console.log('mockData', mockData);
  const sample = mockData.slice(0, 20);

  return (
    <div className="app" >
      <div className="app-header" >
        <h1 >Funderbeam data</h1 >
      </div >
      <h2 >Here comes 3 views for representing data</h2 >
      <p >somehow implemented in tabs or smth...</p >
      <Table data={sample} />
      <Card />
      <Statistics />
    </div >
  );
};

export default App;
