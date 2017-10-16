import React from 'react';
import PropTypes from 'prop-types';

const showYear = (dateString) => {
    try {
        return dateString.substring(0, 4);
    } catch (err) {
        return '-';
    }
};

class CompanyRow extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.company)
    }

    render() {
        return (
            <tr>
                <td>
                    <table>
                        <tbody>
                        <tr>
                            <td className='borderless'>
                                <img className='logo' src={this.props.company.logo100x100} alt="logo"/>
                            </td>
                            <td className='borderless'>
                                <p className='companyName'>{this.props.company.name}</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td>{this.props.company.description}</td>
                <td>{this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}</td>
                <td>{this.props.company.employees}</td>
                <td>{this.props.company.tags}</td>
                <td>{this.props.company.stageName}</td>
                <td>{showYear(this.props.company.foundedOn)}</td>
            </tr>
        );
    }

}

CompanyRow.propTypes = {
    company: PropTypes.object.isRequired
};
export default CompanyRow;
