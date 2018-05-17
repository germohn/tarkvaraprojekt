import React from 'react';
import {getStages, getTags} from './util/UniqueTagsAndStages';
import HeaderBlock from './HeaderBlock/HeaderBlock';

const App = () => {

  return (
    <div className="app">
      <div className="container">
        <HeaderBlock data={data} tags={getTags(data)} stages={getStages(data)}/>
      </div>
      <div className="funderbeam">
        <p id="funderbeamLink">Powered by</p>
        <a href="https://markets.funderbeam.com" target="_blank">
          <img id="funderbeamLogo"
               src="https://raw.githubusercontent.com/germohn/tarkvaraprojekt/master/styles/img/funderbeam2.png"
               alt="funderbeam"/>
        </a>
      </div>
    </div>
  );
};

export default App;
