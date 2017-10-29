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
    } else {
      obj['NaN'] = (obj['NaN'] || 0) + 1;
    }
  }
  const entries = Object.entries(obj);
  const res = [];
  for (let j = 0; j < entries.length; j++) {
    const key = entries[j][0];
    const val = entries[j][1];
    const newObj = {[key]: val};
    res.push(newObj);
  }
  return res;
};

const popularTags = (data) => {
  const allTags = R.flatten(data.map((comp) => {
    if (comp.tags !== undefined) {
      return comp.tags;
    }
  }));
  let obj = {};
  for (let i = 0; i < allTags.length; i++) {
    if (allTags[i] !== undefined) {
      obj[allTags[i]] = (obj[allTags[i]] || 0) + 1;
    }
  }
  const entries = Object.entries(obj);
  const sorted = entries.sort((a, b) => {
    return a[1] - b[1];
  });
  const top10 = sorted.reverse().slice(0, 10);
  const res = [];
  for (let j = 0; j < top10.length; j++) {
    const key = top10[j][0];
    const val = top10[j][1];
    const newObj = {[key]: val};
    res.push(newObj);
  }
  return res;
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
