import {shallow} from 'enzyme';
import React from 'react';
import HeaderBlock from '../../../src/containers/HeaderBlock/HeaderBlock';
import R from 'ramda';

function generateTag() {
  return Math.random().toString(30).substring(7);
}
function generateTagsList(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(generateTag());
  }
  return result;
}

describe('HeaderBlock', () => {
  const comp1 = {'name': 'Zlick', 'employees': 500, 'funding': 5000, 'tags': ['business and industry',
    'financial services'],
    'stageName': 'Efficiency'};
  const comp2 = {'name': 'Zev Motors', 'employees': 2000, 'funding': 20000, 'tags': [
    'big data & ai', 'business and industry', 'marketing and advertising', 'news and media'], 'stageName': 'Unknown'};
  const comp3 = {'name': 'ZeroTurnaround', 'employees': 14, 'funding': 14000, 'tags': ['marketing and advertising',
    'news and media'],
    'stageName': 'Validation'};
  const stagesMap = new Map();
  stagesMap.set('1', 'Discovery');
  stagesMap.set('2', 'Validation');
  stagesMap.set('3', 'Efficiency');
  stagesMap.set('4', 'Scale');
  stagesMap.set('5', 'Mature growth');
  stagesMap.set('6', 'Unknown');

  const generatedTags = generateTagsList(10);
  it('Testing when tag elected, then it should be in selectedTags and one less in unSelectedTags', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={generatedTags} stages={new Map()}/>);

    wrapper.instance().handleTagSelect(generatedTags[0]);

    expect(wrapper.state().selectedTags).to.eql([generatedTags[0]]);
    expect(wrapper.state().unSelectedTags.length).to.eql(9);
  });

  it('Testing if tag not in an array', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={['a', 'b', 'c']} stages={new Map()}/>);

    wrapper.instance().handleTagSelect('tag');

    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags.length).to.eql(3);
  });

  it('Testing if tag is moved to unselectedTags when deselecting it', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={['a', 'b', 'c']} stages={new Map()}/>);

    wrapper.instance().handleTagSelect('a');
    wrapper.instance().handleTagDeselect('a');
    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags.length).to.eql(3);
  });


  it('Testing if stage is moved to selectedStages when selecting', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);

    wrapper.instance().handleStageSelect('Discovery');

    expect(wrapper.state().selectedStages).to.eql(['Discovery']);
    expect(wrapper.state().unSelectedStages.length).to.eql(5);
  });

  it('Testing if non exisiting stage can be selected', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);

    wrapper.instance().handleStageSelect('Stuff');

    expect(wrapper.state().selectedStages).to.eql([]);
    expect(wrapper.state().unSelectedStages.length).to.eql(6);
  });

  it('Testing if stage is moved to unSelectedStages when deselecting', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);

    wrapper.instance().handleStageSelect('Unknown');
    wrapper.instance().handleStageDeselect('Unknown');

    expect(wrapper.state().selectedStages).to.eql([]);
    expect(wrapper.state().unSelectedStages.length).to.eql(6);
  });

  it('Testing if handleSortingClick sets data desc -> asc in table, current and last sortBy: employees', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp1, comp3])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');


    expect(wrapper.state().companies).to.eql([comp3, comp1, comp2]);
    expect(wrapper.state().order).to.eql('asc');
  });
  it('Testing if handleSortingClick sets data asc -> desc in table, current and last sortBy: employees', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp1, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');


    expect(wrapper.state().companies).to.eql([comp2, comp1, comp3]);
    expect(wrapper.state().order).to.eql('desc');
  });
  it('Testing if handleSortingClick sets data desc -> asc in table,current and last sorby: funding', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp3, comp1])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp1, comp3, comp2]);
    expect(wrapper.state().order).to.eql('asc');
  });

  it('Testing if handleSortingClick sets data asc -> desc in table, current and last sorby: funding', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp3, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp2, comp3, comp1]);
    expect(wrapper.state().order).to.eql('desc');
  });
  it('Testing if handleNameClick sets data asc -> desc in table, current and last sorby: name', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp2, comp1])});
    wrapper.setState({order: 'asc'});
    wrapper.setState({sortBy: 'name'});

    wrapper.instance().handleNameClick(0, 'name');

    expect(wrapper.state().companies).to.eql([comp1, comp2, comp3]);
    expect(wrapper.state().order).to.eql('desc');
  });
  it('Testing if handleNameClick sets data desc-> asc in table, current and last sorby: name', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp2, comp3])});
    wrapper.setState({order: 'desc'});
    wrapper.setState({sortBy: 'name'});

    wrapper.instance().handleNameClick(0, 'name');

    expect(wrapper.state().companies).to.eql([comp3, comp2, comp1]);
    expect(wrapper.state().order).to.eql('asc');
  });
});
