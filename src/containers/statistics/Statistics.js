import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

/* eslint-disable no-unused-vars */
const yearByYear = (data) => {
  let obj = {};
  for (let i = 0; i < data.length; i++) {
    const date = data[i].foundedOn;
    if (date !== undefined) {
      obj[date.substring(0, 4)] = (obj[date.substring(0, 4)] || 0) + 1;
    } else{
      obj['NaN'] = (obj['NaN'] || 0) + 1;
    }
  }
  return obj;
};

const popularTags = (data) => {
  const allTags = R.flatten(data.map((comp) => {
    if (comp.tags !== undefined) {
      return comp.tags;
    }
  }));
  let obj = {};
  for (let i = 0; i<allTags.length; i++) {
    if (allTags[i] !== undefined) {
      obj[allTags[i]] = (obj[allTags[i]] || 0) + 1;
    }
  }
  const sorted = Object.keys(obj).map(function(key) {
    return [key, this[key]];
  }, obj).sort(function(a, b) {
    return b[1] - a[1];
  });
  return sorted.slice(0, 10);
};

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <p>statistics</p>
    </div>
    );
  }
}


Statistics.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default Statistics;
