import {getStages, getTags} from '../../../src/containers/util/UniqueTagsAndStages';


describe('Tags', () => {
  it('If only unique tags are collected', () => {
    const compsWithTags = [
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
    expect(getTags(compsWithTags)).to.eql(
        ['big data & ai', 'business and industry', 'marketing and advertising',
      'news and media', 'financial services']
    );
  });

  it('If tags not defined then an empty array is returned', () => {
    const compsWithStages = [
      {
        'name': 'name',
        'tags': undefined
      }
    ];
    expect(getTags(compsWithStages)).to.be.an('array').that.is.empty;
  });
});

describe('Stages', () => {
  it('If all unique stages are returned as map and key-s are the stageOrder-s, no undefined stages in the map', () => {
    const expectedStageMap = new Map();
    expectedStageMap.set('1', 'Discovery');
    expectedStageMap.set('2', 'Validation');
    expectedStageMap.set('3', 'Efficiency');
    expectedStageMap.set('4', 'Scale');
    expectedStageMap.set('5', 'Mature growth');
    expectedStageMap.set('6', 'Unknown');

    const compsWithStages = [
      {
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
    expect(getStages(compsWithStages)).to.eql(expectedStageMap);
  });
});
