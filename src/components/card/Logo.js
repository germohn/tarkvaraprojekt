import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  {
    if (!props.url) {
      return (<img className="logo" src='../styles/img/no-image-icon-23494.jpg'
                   alt="logo"/>);
    } else {
      return (<img className="logo" src={props.url}
                   alt="logo"/>);
    }
  }
};

Logo.propTypes = {
  url: PropTypes.string.isRequired
};

export default Logo;
