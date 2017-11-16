import React from 'react';
import PropTypes from 'prop-types';

const getSubstring = (input) => {
  if (!input) return;
  const limit = 70;
  if (input.length < limit) return input;
  if (input.indexOf(' ', limit * 0.9) == -1) return input;
  const end = input.indexOf(' ', limit * 0.9);
  return input.substring(0, end) + '...';
};

class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  rowClick(link) {
    window.open(link);
  }

  showLogo(link) {
    if (!link) {
      return (<img className='logo' src='../styles/img/no-image-icon-23494.jpg'
                   alt="logo"/>);
    } else {
      return (<img className='logo' src={link}
                   alt="logo"/>);
    }
  }

  render() {
    return (
      <tr className='company-row' onClick={(e) => this.rowClick(this.props.company.url)}>
        <td>
          <table>
            <tbody>
            <tr>
              <td className="borderless" rowSpan="2">{this.showLogo(this.props.company.logo100x100)}</td>
              <td className="borderless">
                <table>
                  <tbody>
                  <tr>
                    <td><p className='companyName'>{this.props.company.name}</p></td>
                  </tr>
                  <tr>
                    <td id="description" colSpan="2">{getSubstring(this.props.company.description)}</td>
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
