import React from 'react';
import mockData from '../mockData';
import {getStages, getTags} from './util/UniqueTagsAndStages';
import HeaderBlock from './HeaderBlock/HeaderBlock';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <HeaderBlock data={mockData} tags={getTags(mockData)} stages={getStages(mockData)}/>
      </div>
      <div className="funderbeam">
        <p id="funderbeamLink">Powered by</p>
        <a href="https://markets.funderbeam.com" target="_blank">
        <img id="funderbeamLogo" src='../../styles/img/funderbeam2.png'
             alt="logo"/>
        </a>
      </div>
    </div>
  );
};

export default App;
