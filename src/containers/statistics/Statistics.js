import React from 'react';
import PropTypes from 'prop-types';


/* eslint-disable no-unused-vars */


const employees = (data) => {
  let employeesData = {};
  const allEmployees = [];
  const undefinedEmployees = [];

  data.map((comp) => {
    if (comp.employees !== undefined) {
      return allEmployees.push(comp.employees);
    }else {
      undefinedEmployees.push(comp.employees);
    }
  });

  const totalSum = total(allEmployees);
  const averageOfData = average(totalSum, allEmployees);
  employeesData['Total'] = totalSum;
  employeesData['Average'] = averageOfData;
  employeesData['Undefined'] = undefinedEmployees.length;

  return employeesData;
};

const fundings = (data) => {
  let fundingsData = {};
  const allFundings = [];
  const undefinedFundings = [];

  data.map((comp) => {
    if (comp.funding !== undefined) {
      return allFundings.push(comp.funding);
    }else {
      undefinedFundings.push(comp.funding);
    }
  });

  const totalSum = total(allFundings);
  const averageOfData = average(totalSum, allFundings);
  fundingsData['Total'] = totalSum;
  fundingsData['Average'] = averageOfData;
  fundingsData['Undefined'] = undefinedFundings.length;

  return fundingsData;
};


const average = (sum, dataArray) => {
  const compCounter = dataArray.length;
  return Math.round(sum / compCounter);
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
