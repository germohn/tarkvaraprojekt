/* eslint-disable no-undef */
import React from 'react';
import TableView from '../../../src/containers/table/Table';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import CompanyRow from '../../../src/components/table/CompanyRow';


function generateFakeCompany() {
  return {
    'slug': Math.random().toString(36).substring(7),
    'name': Math.random().toString(36).substring(12),
  };
}

function generateFakeCompanies(n) {
  const result = [];
  for(let i = 0; i < n; i++) {
    result.push(generateFakeCompany());
  }
  return result;
}

describe('Table', () => {
  const noop = sinon.spy();

  it('Testing if 5/5 comps are rendered', () => {
     const companies = generateFakeCompanies(5);

     const wrapper = shallow(<TableView data={companies} handleNameClick={noop} handleSortingClick={noop}/>);

     expect(wrapper).to.have.exactly(5).descendants(CompanyRow);
  });

  it('Testing if 10/15 comps are rendered', () => {
    const companies = generateFakeCompanies(15);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop} handleSortingClick={noop}/>);

    expect(wrapper).to.have.exactly(10).descendants(CompanyRow);
  });

  it('Tests that "Show more" works correctly', () => {
    const companies = generateFakeCompanies(15);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop} handleSortingClick={noop}/>);

    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(15).descendants(CompanyRow);
  });

  it('Tests that "Show more" adds 20 more rows to showCount state', () => {
    const companies = generateFakeCompanies(50);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop} handleSortingClick={noop}/>);

    const initial = wrapper.find(CompanyRow).length;

    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(initial + 20).descendants(CompanyRow);
  });
  it('Tests that "Show more" adds 40 more rows to showCount state', () => {
    const companies = generateFakeCompanies(80);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop} handleSortingClick={noop}/>);

    const initial = wrapper.find(CompanyRow).length;

    wrapper.instance().showMore();
    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(initial + 40).descendants(CompanyRow);
  });
});
