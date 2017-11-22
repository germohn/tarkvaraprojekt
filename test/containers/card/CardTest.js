import React from 'react';
import CardView from '../../../src/containers/card/Card';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import CompanyCard from '../../../src/components/card/CompanyCard';

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

describe('Card', () => {
  const noop = sinon.spy();

  it('Testing if 5/5 comps are rendered', () => {
    const companies = generateFakeCompanies(5);
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop}
                                      handleSortingClick={noop} renderArrow={noop}/>);

    expect(wrapper).to.have.exactly(5).descendants(CompanyCard);
  });

  it('Testing if 10/15 comps are rendered', () => {
    const companies = generateFakeCompanies(15);
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop}
                                      handleSortingClick={noop} renderArrow={noop}/>);

    expect(wrapper).to.have.exactly(10).descendants(CompanyCard);
  });

  it('Test if "Show more" works correctly', () => {
    const companies = generateFakeCompanies(15);
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop}
                                      handleSortingClick={noop} renderArrow={noop}/>);

    wrapper.instance().showMore();
    expect(wrapper).to.have.exactly(15).descendants(CompanyCard);
  });
  it('Test if "Show all" works correctly', () =>{
    const companies = generateFakeCompanies(80);
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop}
                                      handleSortingClick={noop} renderArrow={noop}/>);
    wrapper.instance().showAll();
    expect(wrapper).to.have.exactly(80).descendants(CompanyCard);
  });
  it('Testing if the cards are sorted by name when clicking Name or its arrow', () => {
    const companies = generateFakeCompanies(30);
    const noop1 = sinon.spy();
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop1}
                                      handleSortingClick={noop} renderArrow={noop}/>);

    expect(wrapper.find('#sortByName'));
    const modal = wrapper.find('#sortByName');
    modal.simulate('click');
    expect(noop1.calledOnce).to.be.true;
  });
  it('Testing if the cards are sorted by name when clicking Name or its arrow', () => {
    const companies = generateFakeCompanies(30);
    const noop1 = sinon.spy();
    const wrapper = shallow(<CardView data={companies} handleNameClick={noop}
                                      handleSortingClick={noop1} renderArrow={noop}/>);

    expect(wrapper.find('#sortByFunding'));
    const modal = wrapper.find('#sortByFunding');
    modal.simulate('click');
    expect(noop1.calledOnce).to.be.true;
  });
});
