
import {changeOrder} from '../../../src/containers/util/SortAndFilterFunctions';

describe('Testing changeOrder function, sorting by name ', () => {
  const descendingData = [
    {slug: 'first-wallet', name: 'Zlick'},
    {slug: 'zev-motors', name: 'Zev Motors'},
    {slug: 'zerply', name: 'Zerply'},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
    {slug: 'smartly-3', name: 'Smartly.sg'},
  ];
  const ascendingData = [{slug: 'smartly-3', name: 'Smartly.sg'},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround'},
    {slug: 'zerply', name: 'Zerply'},
    {slug: 'zev-motors', name: 'Zev Motors'},
    {slug: 'first-wallet', name: 'Zlick'}
  ];
  it('When data descending and changed to ascending', () => {
    expect(changeOrder(descendingData, 'name', 'asc')).to.eql(ascendingData);
  });
  it('When data ascending and changed to ascending', () => {
    expect(changeOrder(ascendingData, 'name', 'asc')).to.eql(ascendingData);
  });

  it('When data in ascending order and changed to descending', () => {
    expect(changeOrder(ascendingData, 'name', 'desc')).to.eql(descendingData);
  });

  it('When data descending and changed to descending', () => {
    expect(changeOrder(descendingData, 'name', 'desc')).to.eql(descendingData);
  });
});
