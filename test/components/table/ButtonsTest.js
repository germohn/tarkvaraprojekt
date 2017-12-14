import React from 'react';
import Buttons from '../../../src/components/shared/Buttons';
import {shallow} from 'enzyme';

describe('Testing if Buttons are rendered', () => {
  const noop = sinon.spy();

  it('renders buttons when limit < props.length', () => {
    expect(shallow(<Buttons limit={10} length={15} showAll={noop} showMore={noop}/>)).to.exist;
  });

  it('renders buttons when limit > props.length', () => {
    expect(shallow(<Buttons limit={15} length={10} showAll={noop} showMore={noop}/>)).to.exist;
  });

  it('function called when showAll is clicked', () => {
    const noop = sinon.spy();
    const wrapper = shallow(<Buttons limit={10} length={15} showAll={noop} showMore={0}/>);

    const modal = wrapper.find('.showAll');
    modal.simulate('click');

    expect(noop.calledOnce).to.be.true;
  });

  it('function called when showMore button is clicked', () => {
    const wrapper = shallow(<Buttons limit={10} length={15} showAll={0} showMore={noop}/>);

    const modal = wrapper.find('.showMore');
    modal.simulate('click');

    expect(noop.calledOnce).to.be.true;
  });
});
