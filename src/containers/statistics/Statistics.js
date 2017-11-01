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
