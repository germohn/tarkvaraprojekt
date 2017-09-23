import React from 'react';

import Table from './table/Table';
import Card from './card/Card';
import Statistics from './statistics/Statistics';

const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <h1>Funderbeam data</h1>
      </div>
      <h2>Here comes 3 views for representing data</h2>
      <p>somehow implemented in tabs or smth...</p>
      <Table/>
      <Card/>
      <Statistics/>
    </div>
  );
};

export default App;
