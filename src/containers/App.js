import React from 'react';
import mockData from '../mockData';
import {getStages, getTags} from './util/UniqueTagsAndStages';
import HeaderBlock from './HeaderBlock/HeaderBlock';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="funderbeam leftAligned">
          <img id="funderbeamLogo" src='../styles/img/funderbeam.png'
               alt="logo"/>
          <a id="funderbeamLink" href="https://markets.funderbeam.com" target="_blank">Powered by funderbeam</a>
        </div>
        <HeaderBlock data={mockData} tags={getTags(mockData)} stages={getStages(mockData)}/>
      </div>
    </div>
  );
};

export default App;
