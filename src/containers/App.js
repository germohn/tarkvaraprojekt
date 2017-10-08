import React from 'react';
import R from 'ramda'
import Table from './table/Table';
import Card from './card/Card';
import Statistics from './statistics/Statistics';
import mockData from '../mockData';


const App = () => {


    console.log('The whole dataSet: ', mockData);
    const sample = mockData.slice(0, 20);

    const allTags = R.flatten(mockData.map(comp => {
        return comp.tags
    }));
    // console.log(allTags);
    // const temp = R.countBy(R.uniq)(allTags)
    console.log('All unique Tags in the dataSet: ',R.uniq(allTags));

    return (
        <div className="app">
            <div className="app-header">
                <h1>Funderbeam data</h1>
            </div>
            <h2>Here comes 3 views for representing data</h2>
            <p>somehow implemented in tabs or smth...</p>
            <Table data={sample}/>
            <Card/>
            <Statistics/>
        </div>
    );
};

export default App;
