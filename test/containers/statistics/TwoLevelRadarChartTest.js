import {shallow} from 'enzyme';
import React from 'react';
import TwoLevelRadarChart from '../../../src/containers/statistics/TwoLevelRadarChart';


describe('TwoLevelPrieChart tests', () => {
  const data = [
    {name: 'information technology', value: 125},
    {name: 'business and industry', value: 15},
    {name: 'financial services', value: 3},
    {name: 'others', value: 203},
  ];
  it('Testing TwoLevelRadarChart rendering', () => {
    const wrapper = shallow(<TwoLevelRadarChart data={data}/>);
    expect(wrapper.find('RadarChart')).to.exist;
  });
});