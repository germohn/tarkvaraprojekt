import React from 'react';
import PropTypes from 'prop-types';


const Buttons = (props) => {
  {if (props.limit < props.length) {
    return (
      <div>
        <button className='showAll' type="button" onClick={(e) => props.showMore(e)}>Show more</button>
        <button className='showAll' type="button" onClick={(e) => props.showAll(e)}>Show all</button>
      </div>);
  } else {
    return (
      <div>
        <p>No more results to show...</p>
      </div>);
  }}
};

Buttons.propTypes = {
  limit: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  showAll: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default Buttons;
