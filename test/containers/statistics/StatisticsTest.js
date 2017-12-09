import {calculate} from '../../../src/containers/statistics/Statistics';

describe('Statistics tests', () => {
  const allData = [
    {name: 'Comp1', employees: 30, funding: 200000, tags: ['tag1', 'tag2'], foundedOn: '2014-09-15'},
    {name: 'Comp2', employees: 10, funding: 210000, tags: ['tag1', 'tag3'], foundedOn: '2012-02-16'},
    {name: 'Comp2', employees: 4, funding: 5000, tags: ['tag1', 'tag4'], foundedOn: '2001-02-10'},
    {name: 'Exobike', employees: 50, funding: 20000, tags: ['tag5', 'tag6'], foundedOn: '2000-03-30'},
    {name: 'Festivality', employees: 20, funding: 3000, tags: ['tag1', 'tag2'], foundedOn: '2017-09-15'},
    {name: 'Huntloc', employees: 4, funding: 5300, tags: ['tag5', 'tag6'], foundedOn: '2002-10-20'}
  ];
  it('Testing calculate function', () => {
    expect(calculate(allData)).to.eql({
      totalFunding: 443300, totalEmployees: 118, averageFunding: 73883,
      averageEmployees: 20, noOfUndefinedEmployees: 0, noOfUndefinedFunding: 0,
      count: 6, averageFounders: NaN, totalFounders: 0
    });
  });
});
