
import {changeNumOrder, changeOrder} from '../../../src/containers/util/SortAndFilterFunctions';

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

describe('Testing changeNumOrder, employees, founded and funding', () => {
  const employeesDescendingData = [
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000},
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744},
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000}
  ];
  const employeesAscendingData = [
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000},
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000}
  ];

  const foundedDescendingData = [
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744},
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000},
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285}
  ];
  const foundedAscendingData = [
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000},
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744}
  ];

  const fundingDescendingData = [
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000},
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744},
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285}
  ];
  const fundingAscendingData = [
    {slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285},
    {slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744},
    {slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000},
    {slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83, foundedOn: '2007-09-07', funding: 16000000}
  ];

  it('When employees is descending and changed to ascending', () =>{
    expect(changeNumOrder(employeesDescendingData, 'employees', 'asc')).to.eql(employeesAscendingData);
  });
  it('When employees is ascending and changed to descending', () =>{
    expect(changeNumOrder(employeesAscendingData, 'employees', 'desc')).to.eql(employeesDescendingData);
  });
  it('When employees is descending and changed to descending', () =>{
    expect(changeNumOrder(employeesDescendingData, 'employees', 'desc')).to.eql(employeesDescendingData);
  });
  it('When employees is ascending and changed to ascending', () =>{
    expect(changeNumOrder(employeesAscendingData, 'employees', 'asc')).to.eql(employeesAscendingData);
  });

  it('When founded is descending and changed to ascending', () =>{
    expect(changeNumOrder(foundedDescendingData, 'foundedOn', 'asc')).to.eql(foundedAscendingData);
  });
  it('When founded is ascending and changed to descending', () =>{
    expect(changeNumOrder(foundedAscendingData, 'foundedOn', 'desc')).to.eql(foundedDescendingData);
  });
  it('When founded is descending and changed to descending', () =>{
    expect(changeNumOrder(foundedDescendingData, 'foundedOn', 'desc')).to.eql(foundedDescendingData);
  });
  it('When founded is ascending and changed to ascending', () =>{
    expect(changeNumOrder(foundedAscendingData, 'foundedOn', 'asc')).to.eql(foundedAscendingData);
  });

  it('When funding is descending and changed to ascending', () =>{
    expect(changeNumOrder(fundingDescendingData, 'funding', 'asc')).to.eql(fundingAscendingData);
  });
  it('When funding is ascending and changed to descending', () =>{
    expect(changeNumOrder(fundingAscendingData, 'funding', 'desc')).to.eql(fundingDescendingData);
  });
  it('When funding is descending and changed to descending', () =>{
    expect(changeNumOrder(fundingDescendingData, 'funding', 'desc')).to.eql(fundingDescendingData);
  });
  it('When funding is ascending and changed to ascending', () =>{
    expect(changeNumOrder(fundingAscendingData, 'funding', 'asc')).to.eql(fundingAscendingData);
  });
});
