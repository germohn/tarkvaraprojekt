import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../shared/Logo';
import {getSubstring} from '../../containers/util/OtherFunctions';
import CompanyModal from '../shared/CompanyModal';

class CompanyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <article onClick={(e) => this.open()} className="companyCard">
        <div className="cardLogoContainer">
          <Logo url={this.props.company.logo100x100} view="cardView"/>
        </div>
        <p className='companyName'>{this.props.company.name}</p>
        <div className="descriptionContainer">
          <p className='description'>{getSubstring(this.props.company.description)}</p>
        </div>
        <div className="funding">
          <p>Funding:</p>
          <p>
            {this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : 'unknown'}
          </p>
        </div>
        <a>Read more...</a>
        <CompanyModal company={this.props.company} show={this.state.showModal} close = {this.close}/>
      </article>
    );
  }
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyCard;
