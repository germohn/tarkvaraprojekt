import React from 'react';
import PropTypes from 'prop-types';
import {Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from 'recharts';

class TwoLevelRadarChart extends React.Component {

  render() {
    return (
      <RadarChart cx={225} cy={175} outerRadius={150} width={450} height={350} startAngle={0} clockWise={false}
                  data={this.props.data}>
        <Radar name="All data" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.79}/>
        <Radar name="Filtered data" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.8}/>
        <PolarGrid/>
        <Legend/>
        <PolarAngleAxis dataKey="field"/>
        <PolarRadiusAxis angle={90} domain={[0, 100]} tickCount={11}/>
      </RadarChart>

    );
  }
}

TwoLevelRadarChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TwoLevelRadarChart;

