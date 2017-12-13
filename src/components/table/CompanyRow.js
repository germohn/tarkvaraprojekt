import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../shared/Logo';
import {getSubstring} from '../../containers/util/OtherFunctions';
import CompanyModal from '../shared/CompanyModal';

class CompanyRow extends React.Component {
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
      <tr className='company-row' onClick={(e) => this.open()}>
        <td className="clickable">
          <table>
            <tbody>
            <tr>
              <td rowSpan="2" className="tableLogoContainer">
                <Logo url={this.props.company.logo100x100} view="tableView"/>
              </td>
              <td className="company">
                <table>
                  <tbody>
                  <tr>
                    <td><p className='companyName leftAligned'>{this.props.company.name}</p></td>
                  </tr>
                  <tr>
                    <td className="description leftAligned" colSpan="2">
                      {getSubstring(this.props.company.description)}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
        <td className="clickable">{this.props.company.funding ?
          this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}</td>
        <td className="clickable">{this.props.company.employees ? this.props.company.employees : '-'}</td>
        <td className="clickable">{this.props.company.tags ? this.props.company.tags.join(', ') : '-'}</td>
        <td className="clickable">{this.props.company.stageName}</td>
        <td className="clickable">{this.props.company.foundedOn ?
          this.props.company.foundedOn.substring(0, 4) : '-'}</td>
        <CompanyModal company={this.props.company} show={this.state.showModal} close = {this.close}/>
      </tr>
    );
  }

}

CompanyRow.propTypes = {
  company: PropTypes.object.isRequired
};
export default CompanyRow;
