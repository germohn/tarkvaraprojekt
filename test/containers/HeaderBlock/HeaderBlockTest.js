import {mount, shallow} from 'enzyme';
import 'jsdom-global/register';
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
    'stageName': 'Efficiency', 'foundedOn': 2008};
  const comp2 = {'name': 'Zev Motors', 'employees': 2000, 'funding': 20000, 'tags': [
    'big data & ai', 'business and industry', 'marketing and advertising', 'news and media'], 'stageName': 'Unknown',
    'foundedOn': 2011};
  const comp3 = {'name': 'ZeroTurnaround', 'employees': 14, 'funding': 14000, 'tags': ['marketing and advertising',
    'news and media'],
    'stageName': 'Validation', 'foundedOn': 2015};

  const stagesMap = new Map();
  stagesMap.set('1', 'Discovery');
  stagesMap.set('2', 'Validation');
  stagesMap.set('3', 'Efficiency');
  stagesMap.set('4', 'Scale');
  stagesMap.set('5', 'Mature growth');
  stagesMap.set('6', 'Unknown');

  const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

  const generatedTags = generateTagsList(10);
  it('Testing when tag elected, then it should be in selectedTags and one less in unSelectedTags', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={generatedTags} stages={new Map()}/>);
    wrapper.instance().handleTagSelect(generatedTags[0]);
    expect(wrapper.state().selectedTags).to.eql([generatedTags[0]]);
    expect(wrapper.state().unSelectedTags.length).to.eql(9);
  });
  it('Testing if nonexisiting tag can be selected in an array', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={['a', 'b', 'c']} stages={new Map()}/>);

    wrapper.instance().handleTagSelect('tag');

    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags.length).to.eql(3);
  });
  it('Testing if nonexisiting tag can be deselected', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={['a', 'b', 'c']} stages={new Map()}/>);

    wrapper.instance().handleTagDeselect('tag');

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
  it('Testing if non exisiting stage can be deselected', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);

    wrapper.instance().handleStageDeselect('Stuff');

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
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp1, comp3])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');


    expect(wrapper.state().companies).to.eql([comp3, comp1, comp2]);
    expect(wrapper.state().order).to.eql('asc');
    expect(wrapper.state().sortBy).to.eql('employees');
  });
  it('Testing if handleSortingClick sets data asc -> desc in table, current and last sortBy: employees', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp1, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');

    expect(wrapper.state().companies).to.eql([comp2, comp1, comp3]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('employees');
  });
  it('Testing if handleSortingClick sets data desc -> asc in table,current and last sorby: funding', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp3, comp1])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp1, comp3, comp2]);
    expect(wrapper.state().order).to.eql('asc');
    expect(wrapper.state().sortBy).to.eql('funding');
  });

  it('Testing if handleSortingClick sets data asc -> desc, current and last sorby: funding', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp3, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp2, comp3, comp1]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('funding');
  });

  it('Testing if handleSortingClick sets data asc -> desc, current and last sortby: foundedOn', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp2, comp3])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'foundedOn'});
    wrapper.instance().handleSortingClick(0, 'foundedOn');

    expect(wrapper.state().companies).to.eql([comp3, comp2, comp1]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('foundedOn');
  });
  it('Testing if handleSortingClick sets data desc -> asc, current and last sortby: foundedOn', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp2, comp1])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'foundedOn'});
    wrapper.instance().handleSortingClick(0, 'foundedOn');

    expect(wrapper.state().companies).to.eql([comp1, comp2, comp3]);
    expect(wrapper.state().order).to.eql('asc');
    expect(wrapper.state().sortBy).to.eql('foundedOn');
  });

  it('Testing if handleNameClick sets data asc -> desc in table, current and last sorby: name', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp2, comp1])});
    wrapper.setState({order: 'asc'});
    wrapper.setState({sortBy: 'name'});

    wrapper.instance().handleNameClick(0, 'name');

    expect(wrapper.state().companies).to.eql([comp1, comp2, comp3]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('name');
  });
  it('Testing if handleNameClick sets data desc-> asc in table, current and last sorby: name', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp2, comp3])});
    wrapper.setState({order: 'desc'});
    wrapper.setState({sortBy: 'name'});

    wrapper.instance().handleNameClick(0, 'name');

    expect(wrapper.state().companies).to.eql([comp3, comp2, comp1]);
    expect(wrapper.state().order).to.eql('asc');
    expect(wrapper.state().sortBy).to.eql('name');
  });
  it('Testing if handleNameClick sets data desc-> asc in table, current sortBy: name last sorby: funding', () => {
    wrapper.setState({companies: [comp2, comp3, comp1]});
    wrapper.setState({order: 'desc'});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleNameClick(0, 'name');

    expect(wrapper.state().companies).to.eql([comp3, comp2, comp1]);
    expect(wrapper.state().order).to.eql('asc');
    expect(wrapper.state().sortBy).to.eql('name');
  });
  it('Testing if handleSortingClick sets data emp asc -> founded desc, current sortBy: employees, last sortBy: ' +
    'foundedOn', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp1, comp2])});
    wrapper.setState({order: 'asc'});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'foundedOn');

    expect(wrapper.state().companies).to.eql([comp3, comp2, comp1]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('foundedOn');
  });
  it('Testint if handleSortingClick sets data funding asc -> emp desc', () => {
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp3, comp2])});
    wrapper.setState({order: 'asc'});
    wrapper.setState({sortBy: 'funding'});
    wrapper.instance().handleSortingClick(0, 'employees');

    expect(wrapper.state().companies).to.eql([comp2, comp1, comp3]);
    expect(wrapper.state().order).to.eql('desc');
    expect(wrapper.state().sortBy).to.eql('employees');
  });
  it('Navbar is rendered', () => {
    expect(wrapper.contains('#navbar'));
  });
  it('Testing RenderSearchBar existence', () => {
    expect(wrapper.contains('#searchBox'));
  });
  it('Testing renderView function, key = 1', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({activeTab: 1});

    expect(wrapper.find('TableView')).to.exist;
    expect(wrapper.find('CardView')).to.not.exist;
    expect(wrapper.find('Statistics')).to.not.exist;
  });
  it('Testing renderView function, key = 2 ', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({activeTab: 2});

    expect(wrapper.find('CardView')).to.exist;
    expect(wrapper.find('TableView')).to.not.exist;
    expect(wrapper.find('Statistics')).to.not.exist;
  });
  it('Testing renderView function, !key = 1, !key= 2 ', () => {
    wrapper.setState({activeTab: 3});

    expect(wrapper.find('Statistics')).to.exist;
    expect(wrapper.find('TableView')).to.not.exist;
    expect(wrapper.find('CardView')).to.not.exist;
  });
  it('Testing onClearFiltering, if tags and stages both are cleared when clicking "Clear filtering"', () => {
    const wrapper = shallow(<HeaderBlock data={[]} tags={generatedTags} stages={stagesMap}/>);
    wrapper.instance().handleTagSelect(generatedTags[0]);
    wrapper.instance().handleTagSelect(generatedTags[1]);
    wrapper.instance().handleTagSelect(generatedTags[2]);
    wrapper.instance().handleStageSelect('Validation');
    wrapper.instance().handleStageSelect('Scale');

    wrapper.instance().onClearFiltering(0);

    expect(wrapper.state().unSelectedTags.length).to.eql(10);
    expect(wrapper.state().selectedTags.length).to.eql(0);
    expect(wrapper.state().unSelectedStages.length).to.eql(6);
    expect(wrapper.state().selectedStages.length).to.eql(0);
  });
  it('Test that arrow changes direction', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);

    expect(wrapper.find('.fa-sort')).to.exist;

    wrapper.setState({sortBy: 'name', order: 'desc'});
    expect(wrapper.find('.fa-sort-asc')).to.exist;

    wrapper.setState({sortBy: 'name', order: 'asc'});
    expect(wrapper.find('.fa-sort-desc')).to.exist;

    wrapper.setState({sortBy: 'funding', order: 'desc'});
    expect(wrapper.find('.fa-sort-asc')).to.exist;

    wrapper.setState({sortBy: 'funding', order: 'asc'});
    expect(wrapper.find('.fa-sort-desc')).to.exist;

    wrapper.setState({sortBy: 'employees', order: 'desc'});
    expect(wrapper.find('.fa-sort-asc')).to.exist;

    wrapper.setState({sortBy: 'employees', order: 'asc'});
    expect(wrapper.find('.fa-sort-desc')).to.exist;

    wrapper.setState({sortBy: 'foundedOn', order: 'desc'});
    expect(wrapper.find('.fa-sort-asc')).to.exist;

    wrapper.setState({sortBy: 'foundedOn', order: 'asc'});
    expect(wrapper.find('.fa-sort-desc')).to.exist;
  });
  it('Testing if the views are changed when clicking on tableview tab', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    const modal = wrapper.find('#tableView');
    modal.simulate('click');
    expect(wrapper.state().activeTab).to.eql('1');
  });
  it('Testing if the filtering collapsible opens', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    wrapper.setState({filterOpen: false});
    const modal = wrapper.find('.filterButton');
    modal.simulate('click');
    expect(wrapper.state().filterOpen).to.eql(true);
  });
  it('Testing if the views are changed when clicking on tableview tab', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    wrapper.setState({activeTab: '2'});
    const modal = wrapper.find('#tableView');
    modal.simulate('click');
    expect(wrapper.state().activeTab).to.eql('1');
  });
  it('Testing if the navbar is rendered', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    expect(wrapper.find('.navBarContainer')).to.exist;
  });
  it('Testing if the searchbar render', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    wrapper.setState({search: 'blah'});
    const modal = wrapper.find('.form-control');
    const event = {target: {name: 'pollName', value: 'spam'}};
    modal.simulate('change', event);
    expect(wrapper.state().search).to.eql('spam');
  });
  it('Testing if clearFiltering button is rendered', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={['tag2', 'tag3', 'tag4']} stages={stagesMap}/>);
    wrapper.instance().handleTagSelect('tag2');
    wrapper.instance().handleTagSelect('tag3');
    wrapper.instance().handleStageSelect('Scale');
    const modal = wrapper.find('.clearFilterButton');
    modal.simulate('click');
    expect(wrapper.state().selectedTags).to.eql([]);
  });
  it('Testing if stages are rendered and dealed correctly when selected and clicked on them', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);
    wrapper.instance().handleStageSelect('Scale');
    const modal = wrapper.find('.selectedChip');
    modal.simulate('click');
    expect(wrapper.state().selectedStages).to.eql([]);
    expect(wrapper.state().unSelectedStages).to.eql(['Discovery', 'Validation', 'Efficiency', 'Scale',
      'Mature growth', 'Unknown']);
  });
  it('Testing if stages are rendered when selecting them', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);
    wrapper.instance().handleStageSelect('Scale');
    wrapper.instance().handleStageSelect('Discovery');
    wrapper.instance().handleStageSelect('Efficiency');
    wrapper.instance().handleStageSelect('Unknown');
    wrapper.instance().handleStageSelect('Validation');
    const modal = wrapper.find('.chip');
    modal.simulate('click');
    expect(wrapper.state().selectedStages).to.eql(['Scale', 'Discovery', 'Efficiency', 'Unknown', 'Validation',
      'Mature growth']);
  });
  it('Testing if tags are highlighted correctly when selected and clicked on them', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={['tag1', 'tag2', 'tag3']} stages={stagesMap}/>);
    wrapper.instance().handleTagSelect('tag1');
    const modal = wrapper.find('.selectedChip');
    modal.simulate('click');
    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags).to.eql(['tag1', 'tag2', 'tag3']);
  });
  it('Testing if tags are highligthed correctly when selected and clicked on them', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={['tag1']} stages={new Map()}/>);
    const modal = wrapper.find('.chip');
    modal.simulate('click');
    expect(wrapper.state().selectedTags).to.eql(['tag1']);
    expect(wrapper.state().unSelectedTags).to.eql([]);
  });
  it('Testing if selected tags are rendered', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={['tag1']} stages={new Map()}/>);
    wrapper.instance().handleTagSelect('tag1');
    const modal = wrapper.find('.selectedTag');
    modal.simulate('click');
    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags).to.eql(['tag1']);
  });
  it('Testing if selected stages are rendered ', () => {
    const wrapper = mount(<HeaderBlock data={[]} tags={[]} stages={stagesMap}/>);
    wrapper.instance().handleStageSelect('Scale');
    const modal = wrapper.find('.selectedStage');
    modal.simulate('click');
    expect(wrapper.state().selectedStages).to.eql([]);
    expect(wrapper.state().unSelectedStages).to.eql(['Discovery', 'Validation', 'Efficiency', 'Scale', 'Mature growth',
      'Unknown']);
  });
});
