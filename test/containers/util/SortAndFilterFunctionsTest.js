
import {changeOrder, filterCompanies} from '../../../src/containers/util/SortAndFilterFunctions';

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
