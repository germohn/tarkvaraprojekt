import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../shared/Logo';
import {getSubstring} from '../../containers/util/OtherFunctions';

class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  rowClick(link) {
    window.open(link);
  }

  render() {
    return (
      <tr className='company-row' onClick={(e) => this.rowClick(this.props.company.url)}>
        <td>
          <table>
            <tbody>
            <tr>
              <td rowSpan="2"><Logo url={this.props.company.logo100x100} view="tableView"/></td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td><p className='companyName'>{this.props.company.name}</p></td>
                  </tr>
                  <tr>
                    <td className="description" colSpan="2">{getSubstring(this.props.company.description)}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
        <td>{this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}</td>
        <td>{this.props.company.employees ? this.props.company.employees : '-'}</td>
        <td>{this.props.company.tags ? this.props.company.tags.join(', ') : '-'}</td>
        <td>{this.props.company.stageName}</td>
        <td>{this.props.company.foundedOn ? this.props.company.foundedOn.substring(0, 4) : '-'}</td>
      </tr>
    );
  }

}

CompanyRow.propTypes = {
  company: PropTypes.object.isRequired
};
export default CompanyRow;
