import React from 'react';
import R from 'ramda';
import Table from './table/Table';
import Card from './card/Card';
import Statistics from './statistics/Statistics';
import mockData from '../mockData';
// import {Carousel} from 'react-bootstrap'

// const CarouselInstance = (first, second) => {
//     return (
//         <Carousel>
//             <Carousel.Item>
//                 <div className="container tagsContainer">
//                     <div className="row " style={{margin: '50px 100px'}}>
//                         {first.map((tag, i) => {
//                             return (<div className="chip" key={i}>{tag}</div>);
//                         })}
//                     </div>
//                 </div>
//                 <Carousel.Caption>
//                     <h3>First slide label</h3>
//                     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                 </Carousel.Caption>
//             </Carousel.Item>
//             <Carousel.Item>
//                 <div className="container tagsContainer">
//                     <div className="row " style={{margin: '50px 100px'}}>
//                         {second.map((tag, i) => {
//                             return (<div className="chip" key={i}>{tag}</div>);
//                         })}
//                     </div>
//                 </div>
//                 <Carousel.Caption>
//                     <h3>Second slide label</h3>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                 </Carousel.Caption>
//             </Carousel.Item>
//         </Carousel>
//     )
// };

const App = () => {
    /* eslint-disable */
    console.log('The whole dataSet: ', mockData);
    const sample = mockData.slice(0, 10);

    const allTags = R.flatten(mockData.map((comp) => {
        if (comp.tags !== undefined) {
            return comp.tags;
        }
    }));

    const uniqueTags = R.uniq(allTags).filter(Boolean);

    const stageMap = new Map();
    mockData.forEach((comp) => {
      if(comp.stage !== undefined){
        return stageMap.set(comp.stageOrder, comp.stageName)
      }
    });

    const sortedStageKeys = Array.from(stageMap.keys()).sort();
    const stageMapSorted = new Map();

    for(let i = 0; i < sortedStageKeys.length; i++){
      stageMapSorted.set(sortedStageKeys[i], stageMap.get(i+1))
    }

    /* eslint-enable */
    return (
        <div className="app">
            <div className="app-header">
                <h1>Funderbeam data</h1>
            </div>
            <div className="container">
                <Table data={mockData} tags={uniqueTags} stages={stageMapSorted}/>
            </div>
          <div className="container">
            <Card data={sample} tags={uniqueTags} stages={stageMapSorted}/>
          </div>
            <Statistics/>
        </div>
    );
};

export default App;
