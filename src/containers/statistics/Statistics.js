import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-unused-vars */
const allEmployees = (data) => {
  const allEmployees = [];
  data.forEach((comp) => {
    if (comp.employees !== undefined) {
      return allEmployees.push(comp.employees);
    }
  });
  return allEmployees;
};

const employeesTotal = (allEmployees) => {
  allEmployees.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
};

const averageEmployees = (employeesSum, allemployees) => {
  const compEmployeesCounter = allemployees.length;
  return Math.round(employeesSum / compEmployeesCounter);
};

const allFundings = (data) => {
  const allFundings = [];
  data.forEach((comp) => {
    if(comp.funding !== undefined) {
      return allFundings.push(comp.funding);
    }
  });
  return allFundings;
};

const fundingsTotal = (allFundings) => {
  allFundings.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
};

const averageFunding = (fundingsSum, allFundings) => {
  const compFundingsCounter = allFundings.length;
  return Math.round(fundingsSum /compFundingsCounter);
};


class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const allemployees = allEmployees(this.props.data);
    const totalemployees = employeesTotal(allemployees);
    // console.log('Total employees', totalemployees);
    // console.log('Average employees', averageEmployees(totalemployees, allemployees));

    const allfundings = allFundings(this.props.data);
    const totalfunding = fundingsTotal(allfundings);
    // console.log('Total funding', totalfunding);
    // console.log('Average funding', averageFunding(totalfunding, allfundings));

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
