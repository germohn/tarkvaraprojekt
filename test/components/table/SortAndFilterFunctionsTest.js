
import {changeOrder} from '../../../src/containers/util/SortAndFilterFunctions';

describe('Change order function', () => {
  it('When data descending and changed to ascending', () => {
    const data1 = [
      {slug: 'first-wallet', name: 'Zlick'},
      {slug: 'zev-motors', name: 'Zev Motors'},
      {slug: 'zerply', name: 'Zerply'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
      {slug: 'smartly-3', name: 'Smartly.sg'},
    ];
    expect(changeOrder(data1, 'name', 'asc')).to.eql(
      [{slug: 'smartly-3', name: 'Smartly.sg'},
        {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
        {slug: 'zerply', name: 'Zerply'},
        {slug: 'zev-motors', name: 'Zev Motors'},
        {slug: 'first-wallet', name: 'Zlick'}]
    );
  });
  it('When data ascending and changed to ascending', () => {
    const data2 = [{slug: 'smartly-3', name: 'Smartly.sg'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
      {slug: 'zerply', name: 'Zerply'},
      {slug: 'zev-motors', name: 'Zev Motors'},
      {slug: 'first-wallet', name: 'Zlick'}
      ];
    expect(changeOrder(data2, 'name', 'asc')).to.eql(
      [{slug: 'smartly-3', name: 'Smartly.sg'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
      {slug: 'zerply', name: 'Zerply'},
      {slug: 'zev-motors', name: 'Zev Motors'},
      {slug: 'first-wallet', name: 'Zlick'}]
    );
  });

  it('When data in ascending order and changed to descending', () => {
    const data3 = [{slug: 'smartly-3', name: 'Smartly.sg'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
      {slug: 'zerply', name: 'Zerply'},
      {slug: 'zev-motors', name: 'Zev Motors'},
      {slug: 'first-wallet', name: 'Zlick'}
    ];
    expect(changeOrder(data3, 'name', 'desc')).to.eql(
      [{slug: 'first-wallet', name: 'Zlick'},
        {slug: 'zev-motors', name: 'Zev Motors'},
        {slug: 'zerply', name: 'Zerply'},
        {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
        {slug: 'smartly-3', name: 'Smartly.sg'}]
    );
  });

  it('When data descending and changed to descending', () => {
    const data1 = [
      {slug: 'first-wallet', name: 'Zlick'},
      {slug: 'zev-motors', name: 'Zev Motors'},
      {slug: 'zerply', name: 'Zerply'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
      {slug: 'smartly-3', name: 'Smartly.sg'},
    ];
    expect(changeOrder(data1, 'name', 'desc')).to.eql(
      [
        {slug: 'first-wallet', name: 'Zlick'},
        {slug: 'zev-motors', name: 'Zev Motors'},
        {slug: 'zerply', name: 'Zerply'},
        {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
        {slug: 'smartly-3', name: 'Smartly.sg'}]
    );
  });
});
