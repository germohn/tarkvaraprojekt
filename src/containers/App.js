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
    const sample = mockData.slice(0, 20);

    const allTags = R.flatten(mockData.map((comp) => {
        if (comp.tags !== undefined) {
            return comp.tags;
        }
    }));

    const uniqueTags = R.uniq(allTags).filter(Boolean);

    const stageMap = new Map();
    R.flatten(mockData.map((comp) => {
      if(comp.stage !== undefined){
        return stageMap.set(comp.stageOrder, comp.stageName)
      }
    }));

    const uniqueStages = [];

    mockData.forEach((comp) => {
      uniqueStages[comp.stageOrder] = comp.stageName;
    });

    const lst = stageMap.keys()
    const lst2 = Array.from(lst).sort();
    console.log("number", lst2);

    const stagemapsorted = new Map();
    for(let a = 0; a < lst2.length; a++){
      stagemapsorted.set(lst2[a], stageMap.get(a+1))
    }

    console.log("sorted stages map: ", stagemapsorted);
    /* eslint-enable */
    return (
        <div className="app">
            <div className="app-header">
                <h1>Funderbeam data</h1>
            </div>
            <div className="container">
                <Table data={mockData} tags={uniqueTags} stages={stagemapsorted}/>
            </div>

            <Card/>
            <Statistics/>
        </div>
    );
};

export default App;
