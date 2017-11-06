import React from 'react';
import mockData from '../mockData';
import {getStages, getTags} from './util/UniqueTagsAndStages';
import HeaderBlock from './HeaderBlock/HeaderBlock';

const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <h1>Funderbeam data</h1>
      </div>

      <div className="container">
        <HeaderBlock data={mockData} tags={getTags(mockData)} stages={getStages(mockData)}/>
      </div>
    </div>
  );
};

export default App;
