import {shallow} from 'enzyme';
import React from 'react';
import Logo from '../../../src/components/shared/Logo';


describe('Logo test', () => {
  it('Testing if the right logo is rendered when view it tableView', () => {
    const wrapper = shallow(<Logo url={'https://funderbeam-706056.c.cdn77.org/logos/100x100/CO/get-style.png?1471259129'
    } view={'tableView'}/>);
    expect(wrapper).to.have.id('tableLogo');
    expect(wrapper).to.not.have.id('cardLogo');
  });
  it('Testing if the right logo is rendered when view is cardView', () => {
    const wrapper = shallow(<Logo url={'https://funderbeam-706056.c.cdn77.org/logos/100x100/CO/get-style.png?1471259129'
    } view={'cardView'}/>);
    expect(wrapper).to.have.id('cardLogo');
    expect(wrapper).to.not.have.id('tableLogo');
  });
  it('Testing if the right logo is rendered when view is cardView and no url for the picture in props', () => {
    const wrapper = shallow(<Logo view={'cardView'}/>);
    expect(wrapper).to.have.id('defaultIcon');
  });
});
