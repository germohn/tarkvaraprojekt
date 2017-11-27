import {calculate} from '../../../src/containers/statistics/Statistics';

describe('Statistics tests', () => {
  const allData = [
    {'name': 'Comp1', 'employees': 30, 'funding': 200000, 'tags': ['tag1', 'tag2']},
    {'name': 'Comp2', 'employees': 10, 'funding': 210000, 'tags': ['tag1', 'tag3']},
    {'name': 'Comp2', 'employees': 4, 'funding': 5000, 'tags': ['tag1', 'tag4']}
  ];
  const filteredData = [
    {'name': 'Exobike', 'employees': 50, 'funding': 20000},
    {'name': 'Festivality', 'employees': 20, 'funding': 3000},
    {'name': 'Huntloc', 'employees': 4, 'funding': 5300}
    ];
  it('Testing calculate function', () => {
    expect(calculate(allData)).to.eql({totalFunding: 415000, totalEmployees: 44, averageFunding: 138333,
      averageEmployees: 15, noOfUndefinedEmployees: 0, noOfUndefinedFunding: 0});
    calculate(filteredData);
  });
});
