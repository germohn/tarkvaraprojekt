import R from 'ramda';


export const getTags = (data) => {
  const allTags = R.flatten(data.map((comp) => {
    if (comp.tags !== undefined) {
      return comp.tags;
    }
  }));
  return R.uniq(allTags).filter(Boolean);
};

export const getStages = (data) => {
  const stageMap = new Map();
  data.forEach((comp) => {
    if (comp.stageName !== undefined) {
      return stageMap.set(comp.stageOrder, comp.stageName);
    }
  });

  const sortedStageKeys = Array.from(stageMap.keys()).sort();
  const stageMapSorted = new Map();

  for (let i = 0; i < sortedStageKeys.length; i++) {
    stageMapSorted.set(sortedStageKeys[i], stageMap.get(i + 1));
  }

  return stageMapSorted;
};
