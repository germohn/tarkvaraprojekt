import React from 'react';
import PropTypes from 'prop-types';

class Buttons extends React.Component {

  constructor(props) {
    super(props);
  }

  showButton(limit, length) {
    if (limit < length) {
      return (
        <div>
          <button className='showAll' type="button" onClick={(e) => this.props.showMore(e)}>Show more</button>
          <button className='showAll' type="button" onClick={(e) => this.props.showAll(e)}>Show all</button>
        </div>);
    } else {
      return (
        <div>
          <p>No more results to show...</p>
        </div>);
    }
  }

  render() {
    return (
      <div>
        {this.showButton(this.props.limit, this.props.length)
        } </div>
    );
  }
}

Buttons.propTypes = {
  limit: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  showAll: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default Buttons;
