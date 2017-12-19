import React from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';

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
      if (parseInt(date.substring(0, 4)) > 2007) {
        obj[date.substring(0, 4)] = (obj[date.substring(0, 4)] || 0) + 1;
      } else {
        obj['Earlier'] = (obj['Earlier'] || 0) + 1;
      }
    } else {
      obj['Unknown'] = (obj['Unknown'] || 0) + 1;
    }
  });
  const entries = Object.entries(obj);
  const res = [['year', 'value']];
  entries.forEach(([year, value]) => {
    res.push([year, value]);
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
  sorted.reverse();
  let total = 0;
  sorted.forEach(([tag, count]) => total += count);
  let othersCount = 0;
  const res = [['tag', 'value']];
  sorted.forEach(([key, val]) => {
    val / total > 0.05 ? res.push([key, val]) : othersCount += val;
  });
  res.push(['others', othersCount]);
  return res;
};

const popularStages = (data) => {
  let stages = {};
  data.forEach((comp) => {
    if (comp.stageName) {
      stages[comp.stageName] = (stages[comp.stageName] || 0) + 1;
    }
  });
  const res = [['stage', 'value']];
  const entries = Object.entries(stages);
  const sorted = entries.sort((a, b) => {
    return a[1] - b[1];
  });
  sorted.forEach(([key, val]) => {
    res.push([key, val]);
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
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-6 col-sm-6 col-md-6">
                <div>
                  <Chart
                    chartType="PieChart"
                    data={(popularTags(this.props.filteredData))}
                    options={{'title': 'Popular Tags', 'is3D': true}}
                    graph_id="DonutChart1"
                    width="100%"
                    height="400px"
                    legend_toggle
                  />
                </div>
              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6 col-md-6">
                <div>
                  <Chart
                    chartType="PieChart"
                    data={(yearByYear(this.props.filteredData))}
                    options={{'title': 'Popular Foundation Years', 'is3D': true}}
                    graph_id="DonutChart2"
                    width="100%"
                    height="400px"
                    legend_toggle
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-xs-3 col-sm-3 col-md-3">
              </div>
              <div className="col-lg-6 col-xs-6 col-sm-6 col-md-6">
                <div>
                  <Chart
                    chartType="PieChart"
                    data={(popularStages(this.props.filteredData))}
                    options={{'title': 'Popular Stages', 'is3D': true}}
                    graph_id="DonutChart3"
                    width="100%"
                    height="400px"
                    legend_toggle
                  />
                </div>
              </div>
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
