import React from 'react';
import {shallow} from 'enzyme';

import CompanyRow from '../../../src/components/table/CompanyRow';

describe('CompanyRow', () => {
  const mockCompany = {
    'slug': 'inv24',
    'name': 'INV24',
    'url': 'https://www.funderbeam.com/startups/inv24?ref=startupestonia',
    'homepage': 'http://inv24.com',
    'logo': 'https://funderbeam-706056.c.cdn77.org/logos/CO/inv24.png?1444899521',
    'logo100x100': 'https://funderbeam-706056.c.cdn77.org/logos/100x100/CO/inv24.png?1444899522',
    'hqCountry': 'Estonia',
    'hqCountryIso3': 'EST',
    'description': 'Inv24 is a free online invoice software for creating high quality invoices.',
    'employees': 7,
    'tags': [
      'information technology'
    ],
    'stage': 'DIS',
    'stageName': 'Discovery',
    'foundedOn': '2013-01-01',
    'stageOrder': 1,
    'startup': true,
    'acquired': false,
    'public': false,
    'established': false,
    'closed': false
  };
    it('renders ComapnyRow', () => {
          expect(shallow(<CompanyRow company={mockCompany}/>)).to.exist;
      });
 //   it('Testing if rowClick function is been called out when clicking on the company row', () => {
 //     const noop = sinon.spy();
 //     const wrapper = shallow(<CompanyRow company={mockCompany}/>);
 //     const modal = wrapper.find('.company-row');
 //     modal.simulate('click');
 //     // const stub = sinon.stub(window, 'redirect');
 //     expect(sinon.stub(window,'https://www.funderbeam.com/startups/inv24?ref=startupestonia'));
 //   });
});


