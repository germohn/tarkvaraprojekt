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

    const allStages = R.flatten(mockData.map((comp) => {
        if(comp.stage !== undefined) {
            return comp.stageName
        }
    }));


    const uniqueTags = R.uniq(allTags).filter(Boolean);
    const uniqueStages = R.uniq(allStages).filter(Boolean);

     console.log('All unique Tags in the dataSet: ', allStages);
    //console.log('and stages: ', uniqueStages);

    /* eslint-enable */
    return (
        <div className="app">
            <div className="app-header">
                <h1>Funderbeam data</h1>
            </div>
            <div className="container">
                <Table data={mockData} tags={uniqueTags} stages={uniqueStages}/>
            </div>

            <Card/>
            <Statistics/>
        </div>
    );
};

export default App;
