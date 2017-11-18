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

     const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                        handleSortingClick={noop} renderArrow={noop}/>);

     expect(wrapper).to.have.exactly(5).descendants(CompanyRow);
  });

  it('Testing if 10/15 comps are rendered', () => {
    const companies = generateFakeCompanies(15);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop} renderArrow={noop}/>);

    expect(wrapper).to.have.exactly(10).descendants(CompanyRow);
  });

  it('Tests that "Show more" works correctly', () => {
    const companies = generateFakeCompanies(15);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop} renderArrow={noop}/>);

    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(15).descendants(CompanyRow);
  });

  it('Tests that "Show more" adds 20 more rows to showCount state', () => {
    const companies = generateFakeCompanies(50);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop} renderArrow={noop}/>);

    const initial = wrapper.find(CompanyRow).length;

    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(initial + 20).descendants(CompanyRow);
  });
  it('Tests that "Show more" adds 40 more rows to showCount state', () => {
    const companies = generateFakeCompanies(80);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop} renderArrow={noop}/>);

    const initial = wrapper.find(CompanyRow).length;

    wrapper.instance().showMore();
    wrapper.instance().showMore();

    expect(wrapper).to.have.exactly(initial + 40).descendants(CompanyRow);
  });
  it('Tests that "Show all" displays all companies', () => {
    const companies = generateFakeCompanies(80);

    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop} renderArrow={noop}/>);
    wrapper.setState({data: companies.length});

    wrapper.instance().showAll();
    expect(wrapper).to.have.exactly(80).descendants(CompanyRow);
  });
  it('Test if companycol exists in table and handleNameClick is called when clicked', () => {
    const noop1 = sinon.spy();
    const companies = generateFakeCompanies(80);
    const wrapper = shallow(<TableView data={companies} handleNameClick={noop1}
                                       handleSortingClick={noop} renderArrow={noop}/>);
    expect(wrapper.find('#companyCol')).to.exist;

    const modal = wrapper.find('#companyCol');
    modal.simulate('click');
    expect(noop1.calledOnce).to.be.true;
  });
  it('Test if fundingCol exists in table and handleSortingClick is called when clicked', () => {
    const noop2 = sinon.spy();
    const companies = generateFakeCompanies(80);
    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop2} renderArrow={noop}/>);
    expect(wrapper.find('#fundingCol')).to.exist;

    const modal = wrapper.find('#fundingCol');
    modal.simulate('click');
    expect(noop2.calledOnce).to.be.true;
  });
  it('Test if employeesCol exists in table and handleSortingClick is called when clicked', () => {
    const noop3 = sinon.spy();
    const companies = generateFakeCompanies(80);
    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop3} renderArrow={noop}/>);
    expect(wrapper.find('#employeesCol')).to.exist;

    const modal = wrapper.find('#employeesCol');
    modal.simulate('click');
    expect(noop3.calledOnce).to.be.true;
  });
  it('Test if foundedCol exists in table and handleSortingClick is called when clicked', () => {
    const noop4 = sinon.spy();
    const companies = generateFakeCompanies(80);
    const wrapper = shallow(<TableView data={companies} handleNameClick={noop}
                                       handleSortingClick={noop4} renderArrow={noop}/>);
    expect(wrapper.find('#foundedCol')).to.exist;

    const modal = wrapper.find('#foundedCol');
    modal.simulate('click');
    expect(noop4.calledOnce).to.be.true;
  });
});
