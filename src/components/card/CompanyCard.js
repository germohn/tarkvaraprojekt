import React from 'react';
import PropTypes from 'prop-types';

class CompanyCard extends React.Component {
  constructor(props) {
    super(props);
  }

  cardClick(link) {
    window.open(link);
  }

  render() {
    return (
      <article className="companyCard">
        <div className="logoContainer">
        <img className='logo' src={this.props.company.logo100x100} alt="logo"/>
        </div>
        <p className='companyName'>{this.props.company.name}</p>
        <p className='description'>{this.props.company.description}</p>
        <div className="funding">
          <p>Funding:</p>
          <p>
            {this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}
          </p>
        </div>
        <a>Read more...</a>
      </article>
    );
  }
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyCard;
