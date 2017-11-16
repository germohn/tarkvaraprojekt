import React from 'react';
import PropTypes from 'prop-types';

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.url == undefined) {
      return (<img className="logo" src='../styles/img/no-image-icon-23494.jpg'
                   alt="logo"/>);
    } else {
      return (<img className="logo" src={this.props.url}
                   alt="logo"/>);
    }
  }
}

Logo.propTypes = {
  url: PropTypes.string.isRequired
};
export default Logo;
