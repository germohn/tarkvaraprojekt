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

describe('HeaderBlock', function() {
  const comp1 = {'name': 'Transferwise', 'employees': 500, 'funding': 5000};
  const comp2 = {'name': 'Comp', 'employees': 2000, 'funding': 20000};
  const comp3 = {'name': 'SportID', 'employees': 14, 'funding': 14000};

  const generatedTags = generateTagsList(10);
  it('Testing if tag is selected', function() {
    // it passes and doen't find a bug
    const wrapper = shallow(<HeaderBlock data={[]} tags={generatedTags} stages={new Map()}/>);

    wrapper.instance().handleTagSelect(generatedTags[0]);

    expect(wrapper.state().selectedTags).to.eql([generatedTags[0]]);
    expect(wrapper.state().unSelectedTags.length).to.eql(9);
  });

  it('Testing if tag not in an array', function() {
    // finds the bug that last test didn't find
    const wrapper = shallow(<HeaderBlock data={[]} tags={['a', 'b', 'c']} stages={new Map()}/>);

    wrapper.instance().handleTagSelect('tag');

    expect(wrapper.state().selectedTags).to.eql([]);
    expect(wrapper.state().unSelectedTags.length).to.eql(3);
  });

  it('Testing if handleSortingClick sets data desc -> asc in table, current and last sortBy: employees', function() {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp1, comp3])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');


    expect(wrapper.state().companies).to.eql([comp3, comp1, comp2]);
    expect(wrapper.state().order).to.eql('asc');
  });
  it('Testing if handleSortingClick sets data asc -> desc in table, current and last sortBy: employees', function() {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);
    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp3, comp1, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'employees'});
    wrapper.instance().handleSortingClick(0, 'employees');


    expect(wrapper.state().companies).to.eql([comp2, comp1, comp3]);
    expect(wrapper.state().order).to.eql('desc');
  });
  it('Testing if handleSortingClick sets data desc -> asc in table,current and last sorby: funding',
    function() {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp2, comp3, comp1])});
    wrapper.setState({order: ('desc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp1, comp3, comp2]);
    expect(wrapper.state().order).to.eql('asc');
  });

  it('Testing if handleSortingClick sets data asc -> desc in table, current and last sorby: funding', function() {
    const wrapper = shallow(<HeaderBlock data={[]} tags={[]} stages={new Map()}/>);

    wrapper.setState({companies: R.sortBy(R.compose(R.toLower, R.prop('name')))([comp1, comp3, comp2])});
    wrapper.setState({order: ('asc')});
    wrapper.setState({sortBy: 'funding'});

    wrapper.instance().handleSortingClick(0, 'funding');

    expect(wrapper.state().companies).to.eql([comp2, comp3, comp1]);
    expect(wrapper.state().order).to.eql('desc');
  });
});

