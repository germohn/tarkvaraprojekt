import {getStages, getTags} from '../../../src/containers/util/UniqueTagsAndStages';


describe('Tags', () => {
  it('If only unique tags are collected', () => {
    const data1 = [
      {
        'name': 'Fortumo',
        'tags': [
          'big data & ai',
          'business and industry',
          'marketing and advertising',
          'news and media'
        ]
      },
      {
        'name': 'Transferwise',
        'tags': [
          'business and industry',
          'financial services'
        ],
      }
    ];
    expect(getTags(data1)).to.eql(
        ['big data & ai', 'business and industry', 'marketing and advertising',
      'news and media', 'financial services']
    );
  });

  it('If tags not defined then an empty array is returned', () => {
    const data2 = [
      {
        'name': 'name',
        'tags': undefined
      }
    ];
    expect(getTags(data2)).to.be.an('array').that.is.empty;
  });
});

describe('Stages', () => {
  it('If all unique stages are returned as map and key-s are the stageOrder-s, no undefined stages in the map', () => {
    const map1 = new Map();
    map1.set('1', 'Discovery');
    map1.set('2', 'Validation');
    map1.set('3', 'Efficiency');
    map1.set('4', 'Scale');
    map1.set('5', 'Mature growth');
    map1.set('6', 'Unknown');

    const data3 = [
      {
        'name': 'name',
        'stage': 'SCA',
        'stageName': 'Scale',
        'stageOrder': 4
      },
      {
        'stage': 'SCA',
        'stageName': 'Scale',
        'stageOrder': 4
      },
      {
        'stage': 'UNK',
        'stageName': 'Unknown',
        'stageOrder': 6
      },
      {
        'stage': 'MAT',
        'stageName': 'Mature growth',
        'stageOrder': 5
      },
      {
        'stage': 'EFF',
        'stageName': 'Efficiency',
        'stageOrder': 3
      },
      {
        'stage': 'VAL',
        'stageName': 'Validation',
        'stageOrder': 2
      },
      {
        'stage': 'DIS',
        'stageName': 'Discovery',
        'stageOrder': 1
      },
      {
        'stage': undefined
      }

    ];
    expect(getStages(data3)).to.eql(map1);
  });
});
