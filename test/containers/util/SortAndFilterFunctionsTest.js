import {changeOrder, filterCompanies, changeNumOrder} from '../../../src/containers/util/SortAndFilterFunctions';

describe('Testing changeOrder function, sorting by name ', () => {
  const descendingData = [
    {slug: 'first-wallet', name: 'Zlick', tags: ['financial services'], stageName: 'Validation'},
    {slug: 'zev-motors', name: 'Zev Motors', tags: ['financial services'], stageName: 'Efficiency'},
    {slug: 'zerply', name: 'Zerply', tags: ['marketing and advertising', 'news and media'],
      stageName: 'Unknown'},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', tags: ['business and industry', 'financial services'],
      stageName: 'Efficiency'},
    {slug: 'smartly-3', name: 'Smartly.sg', tags: [
      'big data & ai',
      'business and industry',
      'marketing and advertising',
      'news and media'],
      stageName: 'Validation'},
  ];
  const ascendingData = [{slug: 'smartly-3', name: 'Smartly.sg', tags: [
    'big data & ai', 'business and industry', 'marketing and advertising', 'news and media'],
    stageName: 'Validation'},
    {slug: 'zeroturnaround', name: 'ZeroTurnaround', tags: ['business and industry', 'financial services'],
      stageName: 'Efficiency'},
    {slug: 'zerply', name: 'Zerply', tags: ['marketing and advertising', 'news and media'],
      stageName: 'Unknown'},
    {slug: 'zev-motors', name: 'Zev Motors', tags: ['financial services'], stageName: 'Efficiency'},
    {slug: 'first-wallet', name: 'Zlick', tags: ['financial services'], stageName: 'Validation'}
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

  it('Testing filterCompanies function, when now tags and no stages selected', () => {
    expect(filterCompanies(ascendingData, [], [])).to.eql(ascendingData);
  });
  it('Testing filterCompanies function, when some tags are selected and no stages selected', () => {
    expect(filterCompanies(ascendingData, [], ['business and industry', 'financial services'])).to.eql([
      {slug: 'smartly-3', name: 'Smartly.sg',
      tags:
        ['big data & ai',
          'business and industry',
          'marketing and advertising',
          'news and media'],
        stageName: 'Validation'},
      {slug: 'zeroturnaround',
        name: 'ZeroTurnaround',
        tags: ['business and industry', 'financial services'], stageName: 'Efficiency'},
      {slug: 'zev-motors', name: 'Zev Motors', tags: ['financial services'], stageName: 'Efficiency'},
      {slug: 'first-wallet', name: 'Zlick', tags: ['financial services'], stageName: 'Validation'}]);
  });
  it('Testing filterCompanies function, when some stages are selected and no tags selected', () => {
    expect(filterCompanies(ascendingData, ['Validation', 'Efficiency'], [])).to.eql([
      {slug: 'smartly-3', name: 'Smartly.sg', tags: [
        'big data & ai',
        'business and industry',
        'marketing and advertising',
        'news and media'],
        stageName: 'Validation'},
      {slug: 'zeroturnaround', name: 'ZeroTurnaround', tags: [
        'business and industry', 'financial services'], stageName: 'Efficiency'},
      {slug: 'zev-motors', name: 'Zev Motors', tags: ['financial services'], stageName: 'Efficiency'},
      {slug: 'first-wallet', name: 'Zlick', tags: ['financial services'], stageName: 'Validation'}
    ]);
  });
  it('Testing filterCompanies function, when some stages and tags are both selected selected', () => {
    expect(filterCompanies(ascendingData, ['Validation', 'Efficiency'], ['business and industry',
      'financial services'])).to.eql([
        {slug: 'smartly-3', name: 'Smartly.sg', tags: [
          'big data & ai',
          'business and industry',
          'marketing and advertising',
          'news and media'],
          stageName: 'Validation'},
        {slug: 'zeroturnaround', name: 'ZeroTurnaround', tags: [
          'business and industry', 'financial services'], stageName: 'Efficiency'},
        {slug: 'zev-motors', name: 'Zev Motors', tags: ['financial services'], stageName: 'Efficiency'},
      {slug: 'first-wallet', name: 'Zlick', tags: ['financial services'], stageName: 'Validation'}
      ]);
  });
});
describe('Testing changeNumOrder, employees, founded and funding', () => {
  const comp1 ={slug: 'zeroturnaround', name: 'ZeroTurnaround', employees: 83,
    foundedOn: '2007-09-07', funding: 16000000};
  const comp2 ={slug: 'iizi-group', name: 'IIZI group', employees: 75, foundedOn: '2001-01-01', funding: 20285};
  const comp3 ={slug: 'sportlyzer', name: 'Sportlyzer', employees: 7, foundedOn: '2009-07-09', funding: 1059231};
  const comp4 ={slug: 'smartly-3', name: 'Smartly.sg', employees: 5, foundedOn: '2014-01-01', funding: 69744};
  const comp5 ={slug: 'zerply', name: 'Zerply', employees: 3, foundedOn: '2010-04-30', funding: 700000};
  const descendingDataEmployees = [comp1, comp2, comp3, comp4, comp5];
  const ascendingDataEmployees = [comp5, comp4, comp3, comp2, comp1];
  const descendingDataFounded =[comp4, comp5, comp3, comp1, comp2];
  const ascendingDataFounded = [comp2, comp1, comp3, comp5, comp4];
  const descendingDataFunding = [comp1, comp3, comp5, comp4, comp2];
  const ascendingDataFunding = [comp2, comp4, comp5, comp3, comp1];
  it('When employees is descending and changed to ascending', () =>{
    expect(changeNumOrder(descendingDataEmployees, 'employees',
      'asc')).to.eql(ascendingDataEmployees);
  });
  it('When employees is ascending and changed to descending', () =>{
    expect(changeNumOrder(ascendingDataEmployees, 'employees',
      'desc')).to.eql(descendingDataEmployees);
  });
  it('When employees is descending and changed to descending', () =>{
    expect(changeNumOrder(descendingDataEmployees, 'employees',
      'desc')).to.eql(descendingDataEmployees);
  });
  it('When employees is ascending and changed to ascending', () =>{
    expect(changeNumOrder(ascendingDataEmployees, 'employees',
      'asc')).to.eql(ascendingDataEmployees);
  });

  it('When founded is descending and changed to ascending', () =>{
    expect(changeNumOrder(descendingDataFounded,
      'foundedOn', 'asc')).to.eql(ascendingDataFounded);
  });
  it('When founded is ascending and changed to descending', () =>{
    expect(changeNumOrder(ascendingDataFounded,
      'foundedOn', 'desc')).to.eql(descendingDataFounded);
  });
  it('When founded is descending and changed to descending', () =>{
    expect(changeNumOrder(descendingDataFounded,
      'foundedOn', 'desc')).to.eql(descendingDataFounded);
  });
  it('When founded is ascending and changed to ascending', () =>{
    expect(changeNumOrder(ascendingDataFounded,
      'foundedOn', 'asc')).to.eql(ascendingDataFounded);
  });

  it('When funding is descending and changed to ascending', () =>{
    expect(changeNumOrder(descendingDataFunding,
      'funding', 'asc')).to.eql(ascendingDataFunding);
  });
  it('When funding is ascending and changed to descending', () =>{
    expect(changeNumOrder(ascendingDataFunding,
      'funding', 'desc')).to.eql(descendingDataFunding);
  });
  it('When funding is descending and changed to descending', () =>{
    expect(changeNumOrder(descendingDataFunding,
      'funding', 'desc')).to.eql(descendingDataFunding);
  });
  it('When funding is ascending and changed to ascending', () =>{
    expect(changeNumOrder(ascendingDataFunding,
      'funding', 'asc')).to.eql(ascendingDataFunding);
  });
});
