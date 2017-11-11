import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

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

  render() {
    return (
      <article onClick={(e) => this.open()} className="companyCard">
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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <table>
              <tbody>
              <tr>
                <td rowSpan="3"> <img className='logo' src={this.props.company.logo100x100} alt="logo"/></td>
                <td>
                  <tr><td><p className='companyName'>{this.props.company.name}</p></td></tr>
                  <tr><td><p className='description'>{this.props.company.description}</p></td></tr>
                  <tr><td><p>{this.props.company.tags}</p></td></tr>
                </td>
              </tr>
              </tbody>
            </table>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
              <tr>
                <td>
                  <p>Funding: {this.props.company.funding ?
                    this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}</p>
                  <p>Year of foundation: {this.props.company.foundedOn}</p>
                  <p>Employees: {this.props.company.employees}</p>
                  <a target="_blank" href={this.props.company.url}> Go to profile.. </a>
                </td>
              </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.close(e)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </article>
    );
  }
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyCard;
