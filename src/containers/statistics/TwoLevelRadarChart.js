import React from 'react';
import PropTypes from 'prop-types';
import {Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from 'recharts';

class TwoLevelRadarChart extends React.Component {

  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.props.data}>
        <Radar name="All data" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
        <Radar name="Filtered data" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.8}/>
        <PolarGrid/>
        <Legend/>
        <PolarAngleAxis dataKey="field"/>
        <PolarRadiusAxis angle={60} domain={[0, 110]}/>
      </RadarChart>
    );
  }
}

TwoLevelRadarChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TwoLevelRadarChart;

