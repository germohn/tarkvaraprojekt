import React from 'react';
import PropTypes from 'prop-types';


const Buttons = (props) => {
  {
    if (props.limit < props.length) {
      return (
        <div>
          <button className="custom-btn " type="button" onClick={(e) => props.showMore(e)}>Show more</button>
          <button className="custom-btn" type="button" onClick={(e) => props.showAll(e)}>Show all</button>
        </div>);
    } else if (props.length==0) {
      return(
        <p>The filter is too strict, I don’t have anything to show</p>
      );
    } else {
      return ( null );
    }
  }
};

Buttons.propTypes = {
  limit: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  showAll: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default Buttons;
