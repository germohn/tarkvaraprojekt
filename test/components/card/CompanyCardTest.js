import 'jsdom-global/register';
import {shallow} from 'enzyme';
import React from 'react';

import CompanyCard from '../../../src/components/card/CompanyCard';

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
    'closed': false,
    'investors': [
      {
        'name': 'EyeFocus Accelerator ',
        'logo100x100': 'https://funderbeam-706056.c.cdn77.org/logos/100x100/CO/eyefocus-accelerator.png?1453408494',
        'logo': 'https://funderbeam-706056.c.cdn77.org/logos/CO/eyefocus-accelerator.jpeg?1453408469',
        'homepage': 'http://www.eyefocus.co'
      }
    ],
    'founders': [
      {
        'name': 'Sten Tuudak',
        'linkedin': 'https://www.linkedin.com/in/stentuudak',
        'twitter': null,
        'image': 'https://funderbeam-706056.c.cdn77.org/logos/IN/sten-tuudak.jpeg?1474041989',
        'image100x100': 'https://funderbeam-706056.c.cdn77.org/logos/100x100/IN/sten-tuudak.png?1474041992'
      },
      {
        'name': 'Sten Seppo',
        'linkedin': 'https://www.linkedin.com/in/sten-seppo-10601427',
        'twitter': 'https://twitter.com/stenseppo',
        'image': 'https://funderbeam-706056.c.cdn77.org/logos/IN/sten-seppo.jpeg?1495180967',
        'image100x100': 'https://funderbeam-706056.c.cdn77.org/logos/100x100/IN/sten-seppo.png?1495180976'
      }
    ],
  };
   const comp = {'slug': 'inv24',
    'name': 'INV24',
    'url': 'https://www.funderbeam.com/startups/inv24?ref=startupestonia',
   'funding': 2000};
  it('renders CompanyCard', () => {
    expect(shallow(<CompanyCard company={mockCompany}/>)).to.exist;
  });
  it('Modal opens when closed', () => {
    const wrapper = shallow(<CompanyCard company={[]}/>);
    wrapper.setState({showModal: false});
    wrapper.instance().open();
    expect(wrapper.state().showModal).to.eql(true);
  });
  it('Modal closes when opened', () => {
    const wrapper = shallow(<CompanyCard company={[]}/>);
    wrapper.setState({showModal: true});
    wrapper.instance().close();
    expect(wrapper.state().showModal).to.eql(false);
  });
  it('Testing if the modal opened when clicking on the article element (any of the companyCard)', () => {
    const wrapper = shallow(<CompanyCard company={mockCompany}/>);
    wrapper.setState({showModal: false});
    (wrapper.find('article')).simulate('click');
    expect(wrapper.state().showModal).to.be.true;
  });
  it('Testing if the modal closed when clicking on close button ', () => {
    const wrapper = shallow(<CompanyCard company={mockCompany}/>);
    wrapper.setState({showModal: true});
    (wrapper.find('Button')).simulate('click');
    expect(wrapper.state().showModal).to.be.false;
  });
it('Testing the companycard to localeString if funding existing', () => {
    const wrapper = shallow(<CompanyCard company={comp}/>);
    expect(wrapper).to.exist;
  });
});
