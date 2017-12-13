import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
    if (!props.url) {
      return (<img id="defaultIcon" src='../styles/img/no-image-icon-23494.jpg'
                   alt="logo"/>);
    } else {
      return (<img id={props.view == 'cardView' ? 'cardLogo' : 'tableLogo'} src={props.url} alt="logo"/>);
    }
};

Logo.propTypes = {
  url: PropTypes.string,
  view: PropTypes.string.isRequired
};

export default Logo;
