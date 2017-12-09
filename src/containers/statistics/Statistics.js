import React from 'react';
import PropTypes from 'prop-types';
import TwoLevelPieChart from './TwoLevelPieChart';
import TwoLevelRadarChart from './TwoLevelRadarChart';

/* eslint-disable no-unused-vars */
export const calculate = (data) => {
  const initialLength = data.length;
  let noOfDefinedFunding = 0;
  let noOfDefinedEmployees = 0;
  let totalFunding = 0;
  let totalEmployees = 0;
  let noOfFounderInfo = 0;
  let totalFounders = 0;

  data.forEach((comp) => {
    if (comp.employees) {
      noOfDefinedEmployees += 1;
      totalEmployees += comp.employees;
    }
    if (comp.funding) {
      noOfDefinedFunding += 1;
      totalFunding += comp.funding;
    }
    if (comp.founders) {
      noOfFounderInfo += 1;
      totalFounders += comp.founders.length;
    }
  });
  return {
    count: initialLength,
    totalFunding: totalFunding,
    totalEmployees: totalEmployees,
    averageFunding: Math.round(totalFunding / noOfDefinedFunding),
    averageEmployees: Math.round(totalEmployees / noOfDefinedEmployees),
    noOfUndefinedEmployees: initialLength - noOfDefinedEmployees,
    noOfUndefinedFunding: initialLength - noOfDefinedFunding,
    totalFounders,
    averageFounders: Math.round(totalFounders / noOfFounderInfo)
  };
};

const yearByYear = (data) => {
  let obj = {};
  data.forEach((comp) => {
    const date = comp.foundedOn;
    if (date) {
      obj[date.substring(0, 4)] = (obj[date.substring(0, 4)] || 0) + 1;
    } else {
      obj['Unknown'] = (obj['Unknown'] || 0) + 1;
    }
  });
  const entries = Object.entries(obj);
  const res = [];
  let entriesCount = entries.length;
  entries.forEach(([year, value]) => {
    if (entriesCount > 10) {
      if (value >= data.length * 0.03)
        res.push({name: year, value: value});
    } else {
      res.push({name: year, value: value});
    }
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

const popularStages = (data) => {
  let stages = {};
  data.forEach((comp) => {
    if (comp.stageName) {
      stages[comp.stageName] = (stages[comp.stageName] || 0) + 1;
    }
  });
  const res = [];
  const entries = Object.entries(stages);
  const sorted = entries.sort((a, b) => {
    return a[1] - b[1];
  });
  sorted.forEach(([key, val]) => {
    res.push({name: key, value: val});
  });
  return res;
};


const getRadarChartData = (allRadarData, filteredRadarData) => {
  return ([
    temp('Count', allRadarData.count, filteredRadarData.count),
    temp('Average funding', allRadarData.averageFunding, filteredRadarData.averageFunding),
    temp('Average employees', allRadarData.averageEmployees, filteredRadarData.averageEmployees),
    temp('Total funding', allRadarData.totalFunding, filteredRadarData.totalFunding),
    temp('Total employees', allRadarData.totalEmployees, filteredRadarData.totalEmployees),
    temp('Average number of founders', allRadarData.averageFounders, filteredRadarData.averageFounders)
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
    const allChartData = calculate(this.props.allData);
    const filteredChartData = calculate(this.props.filteredData);

    return (
      <div>
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
            <td>{allChartData.averageFunding.toLocaleString('en-US') + ' $'}</td>
            <td>{this.props.filteredData.length > 0 ?
              filteredChartData.averageFunding.toLocaleString('en-US') + ' $' : ''}</td>
          </tr>
          <tr>
            <td>Average employees</td>
            <td>{allChartData.averageEmployees}</td>
            <td>{this.props.filteredData.length > 0 ?
              filteredChartData.averageEmployees : ''}</td>
          </tr>
          <tr>
            <td>Total funding</td>
            <td>{allChartData.totalFunding.toLocaleString('en-US') + ' $'}</td>
            <td>{this.props.filteredData.length > 0 ?
              filteredChartData.totalFunding.toLocaleString('en-US') + ' $' : ''}</td>
          </tr>
          <tr>
            <td>Total Employees</td>
            <td>{allChartData.totalEmployees}</td>
            <td>{this.props.filteredData.length > 0 ? filteredChartData.totalEmployees : ''}</td>
          </tr>
          <tr>
            <td>Average number of founders</td>
            <td>{allChartData.averageFounders}</td>
            <td>{this.props.filteredData.length > 0 ? filteredChartData.averageFounders : ''}</td>
          </tr>
          </tbody>
        </table>

        {this.props.filteredData.length > 0 ?
          <div>
            <div className="col-sm-6 col-sm-offset-3 ">
              <TwoLevelRadarChart data={getRadarChartData(allChartData, filteredChartData)}/>
            </div>
            <div className="col-sm-6 col-sm-offset-2 marginTop">
              <label>Popular tags</label>
              <TwoLevelPieChart data={popularTags(this.props.filteredData)}/>
            </div>
            <div className="col-sm-6 col-sm-offset-2 marginTop">
              <label>Popular founding years</label>
              <TwoLevelPieChart data={yearByYear(this.props.filteredData)}/>
            </div>
            <div className="col-sm-6 col-sm-offset-2 marginTop">
              <label>Startup stages </label>
              <TwoLevelPieChart data={popularStages(this.props.filteredData)}/>
            </div>
          </div>
          :
          <div>
            <h3>The filter is too strict, I don’t have anything to show</h3>
          </div>

        }
      </div>
    );
  }
}

Statistics.propTypes = {
  filteredData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  allData: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Statistics;
