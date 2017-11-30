import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import Logo from '../shared/Logo';
import {getSubstring} from '../../containers/util/OtherFunctions';

class CompanyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
  }

  cardClick(link) {
    window.open(link);
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  joinList(elems) {
    if (!elems) return '';
    let names = [];
    elems.map((founder) =>
      names.push(founder.name)
    );
    return names.join('  |  ');
  }

  renderModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <div className="container-fluid">
            <div className="row">
            </div>
            <div className="row">
              <div className="col-lg-3 col-xs-3 col-sm-3 col-md-3 logoContainer">
                <Logo url={this.props.company.logo100x100} view="cardView"/>
              </div>
              <div className="col-lg-9 col-xs-9 col-sm-9 col-md-9">
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
                    <p className='companyName'>{this.props.company.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
                    <p className="tags">{this.props.company.tags ? this.props.company.tags.join('  |  ') : ''}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 descContainer">
                <p className='description'>{this.props.company.description}</p>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                <b><a href={this.props.company.url} target="_blank">See the profile...</a></b>
              </div>
            </div>
            <div className="row modalRow">
              <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Funding:</b></div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{this.props.company.funding ?
                    this.props.company.funding.toLocaleString('en-US') + ' $' : 'unknown'}</div>
                </div>
              </div>
              <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Employees:</b></div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{this.props.company.employees ?
                    this.props.company.employees : 'unknown'}</div>
                </div>
              </div>
              <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Founded:</b></div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{this.props.company.foundedOn ?
                    this.props.company.foundedOn.substring(0, 4) : 'unknown'}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <b>Founders:</b>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 founders">
                {this.joinList(this.props.company.founders)}
              </div>
            </div>
            <div className="row">
              <b>Investors:</b>
            </div>
            <div className="row investors">
              {this.props.company.investors ? this.props.company.investors.map((investor) => {
                return (
                  <div key={investor.name} className="col-lg-3 col-xs-3 col-sm-3 col-md-3 investor col-centered">
                    <div className="row">
                      <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                        <Logo url={investor.logo100x100} view="cardView"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                        <b>
                          {investor.name}
                        </b>
                      </div>
                    </div>
                  </div>
                );
              }) : ''}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => this.close(e)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <article onClick={(e) => this.open()} className="companyCard">
        <Logo url={this.props.company.logo100x100} view="cardView"/>
        <p className='companyName'>{this.props.company.name}</p>
        <p className='description'>{getSubstring(this.props.company.description)}</p>
        <div className="funding">
          <p>Funding:</p>
          <p>
            {this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}
          </p>
        </div>
        <a>Read more...</a>
        {this.renderModal()}
      </article>
    );
  }
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyCard;
