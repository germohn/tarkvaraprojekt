import React from 'react';
import PropTypes from 'prop-types';


/* eslint-disable no-unused-vars */
const calculate = (data, fieldType) => {
  let calculatedData = {};
  const allDataArray = [];

  data.map((comp) => {
    if (comp[fieldType] !== undefined) {
      return allDataArray.push(comp[fieldType]);
    }
  });

  const undefinedData = data.length - allDataArray.length;
  const definedData = allDataArray.length;
  const totalSum = total(allDataArray);
  const averageOfData = average(totalSum, definedData);

  calculatedData['Total'] = totalSum;
  calculatedData['Average'] = averageOfData;
  calculatedData['Undefined'] = undefinedData;

  return calculatedData;
};

const average = (sum, definedData) => {
  return Math.round(sum / definedData);
};

const total = (dataArray) => {
  const sum = dataArray.reduce((accumulator, currentValue) =>
    accumulator + currentValue);
  return sum;
};

const yearByYear = (data) => {
  let obj = {};
  data.forEach((comp) => {
    const date = comp.foundedOn;
    if (date !== undefined) {
      obj[date.substring(0, 4)] = (obj[date.substring(0, 4)] || 0) + 1;
    } else {
      obj['NaN'] = (obj['NaN'] || 0) + 1;
    }
  });
  const entries = Object.entries(obj);
  const res = [];
  entries.forEach(([year, value]) => {
    res.push({[year]: value});
  });
  return res;
};

const popularTags = (data) => {
  let obj = {};
  data.forEach((comp) => {
    if (comp.tags !== undefined) {
      comp.tags.forEach((tag) => {
        obj[tag] = (obj[tag] || 0) + 1;
      });
    }
  });
  const entries = Object.entries(obj);
  const sorted = entries.sort((a, b) => {
    return a[1] - b[1];
  });
  const top10 = sorted.reverse().slice(0, 10);
  const res = [];
  top10.forEach(([key, val]) => {
    res.push({[key]: val});
  });
  return res;
};

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>statistics</p>
      </div>
    );
  }
}

Statistics.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default Statistics;
