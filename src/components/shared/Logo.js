import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  {
    if (!props.url) {
      return (<img src='../styles/img/no-image-icon-23494.jpg'
                   alt="logo"/>);
    } else {
      if (props.view == 'cardView') {
        return (<img id="cardLogo" src={props.url} alt="logo"/>);
      } else{
        return (<img id="tableLogo" src={props.url} alt="logo"/>);
      }
    }
  }
};

Logo.propTypes = {
  url: PropTypes.string,
  view: PropTypes.string.isRequired
};

export default Logo;
