import React from 'react';
import PropTypes from 'prop-types';
import {Pie, PieChart} from 'recharts';

/* eslint-disable */
const renderActiveShape = (props) => {
  // console.log(props)
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, outerRadius,
    fill, payload, value
  } = props;
  /* eslint-enable */
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{payload.name} ( {value} )
      </text>
    </g>
  );
};

class TwoLevelPieChart extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <PieChart width={700} height={300}>
        <Pie
          label={renderActiveShape}
          data={this.props.data}

          innerRadius={70}
          outerRadius={95}
          fill="#8884d8"
          dataKey={'value'}
          isAnimationActive={false}
        />

      </PieChart>
    );
  }
}

export default TwoLevelPieChart;

TwoLevelPieChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
