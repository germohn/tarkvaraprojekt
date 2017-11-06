import R from 'ramda';


export const changeOrder = (array, sortBy, order) => {
  const newOrder = R.sortBy(R.compose(R.toLower, R.prop(sortBy)))(array);
  if (order === 'desc') {
    return R.reverse(newOrder);
  }
  return newOrder;
};

export const changeNumOrder = (array, sortBy, order) => {
  const undefinedArray = [];
  const definedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i][sortBy] == null) {
      undefinedArray.push(array[i]);
    } else {
      definedArray.push(array[i]);
    }
  }
  if (order === 'desc') {
    const sortByDesc = R.sortWith([
      R.descend(R.prop(sortBy)),
      R.ascend(R.compose(R.toLower(), R.prop('name')))
    ]);
    const newOrder = sortByDesc(definedArray);
    return newOrder.concat(undefinedArray);
  } else {
    const sortByAsc = R.sortWith([
      R.ascend(R.prop(sortBy)),
      R.ascend(R.compose(R.toLower(), R.prop('name')))
    ]);
    const newOrder = sortByAsc(definedArray);
    return newOrder.concat(undefinedArray);
  }
};


export const filterCompanies = (companies, stages, tags) => {
  if (stages.length <= 0 && tags.length <= 0) {
    return companies;
  } else if (stages.length <= 0 && !(tags.length <= 0)) {
    let comps = [];
    tags.forEach((tag) => {
      companies.forEach((comp) => {
        if (comp.tags && comp.tags.includes(tag)) {
          comps.push(comp);
        }
      });
    });
    return R.uniq(comps);
  } else if (!(stages.length <= 0) && tags.length <= 0) {
    let comps = [];
    stages.forEach((stage) => {
      companies.forEach((comp) => {
        if (comp.stage && stages.includes(comp.stageName)) {
          comps.push(comp);
        }
      });
    });
    return R.uniq(comps);
  } else if (!(stages.length <= 0) && !(tags.length <= 0)) {
    let comps = [];
    stages.forEach((stage) => {
      tags.forEach((tag) => {
        companies.forEach((comp) => {
          if (comp.stage && stages.includes(comp.stageName) && comp.tags && comp.tags.includes(tag)) {
            comps.push(comp);
          }
        });
      });
    });
    return R.uniq(comps);
  }
};
