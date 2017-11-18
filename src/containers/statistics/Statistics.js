import React from 'react';
import PropTypes from 'prop-types';
import TwoLevelPieChart from './TwoLevelPieChart';
import TwoLevelRadarChart from './TwoLevelRadarChart';

/* eslint-disable no-unused-vars */
const calculate = (data) => {
  const initialLength = data.length;
  let allFunding = [];
  let allEmployees = [];
  let totalFunding = 0;
  let totalEmployees = 0;

  data.forEach((comp) => {
    if (comp.employees) {
      allEmployees.push(comp.employees);
      totalEmployees += comp.employees;
    }
    if (comp.funding) {
      allFunding.push(comp.funding);
      totalFunding += comp.funding;
    }
  });
  return {
    totalFunding: totalFunding,
    totalEmployees: totalEmployees,
    averageFunding: Math.round(totalFunding / allFunding.length),
    averageEmployees: Math.round(totalEmployees / allEmployees.length),
    noOfUndefinedEmployees: initialLength - allEmployees.length,
    noOfUndefinedFunding: initialLength - allFunding.length
  };
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
  let othersCount = 0;
  const res = [];
  sorted.forEach(([key, val], i) => {
    i < 10 ? res.push({name: key, value: val}) : othersCount += val;
  });
  res.push(({name: 'others', value: othersCount}));
  return res;
};


const getRadarChartData = (allData, filtered) => {
  const allDataFunging = calculate(allData, 'funding');
  const filteredDataFunging = calculate(filtered, 'funding');
  const allDataEmployees = calculate(allData, 'employees');
  const filteredDataEmployees = calculate(filtered, 'employees');

  return ([
    temp('count', allData.length, filtered.length),
    temp('avgFunding', allDataFunging.average, filteredDataFunging.average),
    temp('avgEmployees', allDataEmployees.average, filteredDataEmployees.average),
    temp('totalFunding', allDataFunging.total, filteredDataFunging.total),
    temp('totalEmployees', allDataEmployees.total, filteredDataEmployees.total),
  ]);
};

const temp = (field, a, b) => {
  if (a > b) {
    return ({
      field: field,
      A: 100,
      B: b / a * 100,
      fullMark: 100
    });
  } else if (a < b) {
    return ({
      field: field,
      A: a / b * 100,
      B: 100,
      fullMark: 100
    });
  }
  return ({
    field,
    A: 100,
    B: 100,
    fullMark: 100
  });
};


class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const allDataFunging = calculate(this.props.allData, 'funding');
    const filteredDataFunging = calculate(this.props.filteredData, 'funding');
    const allDataEmployees = calculate(this.props.allData, 'employees');
    const filteredDataEmployees = calculate(this.props.filteredData, 'employees');

    return (
      <div>

        <p>statistics</p>
        <TwoLevelPieChart data={popularTags(this.props.allData)}/>
        <TwoLevelPieChart data={popularTags(this.props.filteredData)}/>
        <TwoLevelRadarChart data={getRadarChartData(this.props.allData, this.props.filteredData)}/>

        <table className="table">
          <thead>
          <tr>
            <th>Value</th>
            <th>All data</th>
            <th>Filtered</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Count</td>
            <td>{this.props.allData.length}</td>
            <td>{this.props.filteredData.length}</td>
          </tr>
          <tr>
            <td>Average funding</td>
            <td>{allDataFunging.average.toLocaleString('en-US') + ' $'}</td>
            <td>{filteredDataFunging.average.toLocaleString('en-US') + ' $'}</td>
          </tr>
          <tr>
            <td>Average employees</td>
            <td>{allDataEmployees.average}</td>
            <td>{filteredDataEmployees.average}</td>
          </tr>
          <tr>
            <td>Total funding</td>
            <td>{allDataFunging.total.toLocaleString('en-US') + ' $'}</td>
            <td>{filteredDataFunging.total.toLocaleString('en-US') + ' $'}</td>
          </tr>
          <tr>
            <td>Total Employees</td>
            <td>{allDataEmployees.total}</td>
            <td>{filteredDataEmployees.total}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Statistics.propTypes = {
  filteredData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  allData: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Statistics;
