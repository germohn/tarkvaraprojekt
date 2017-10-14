import React from 'react';
import PropTypes from 'prop-types';

class CompanyRow extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.company)
    }


    render() {
        return (
            <tr>
                <td>
                    <tr>
                        <td className='borderless'>
                            <img className = 'logo' src = {this.props.company.logo100x100} alt = "logo"/>
                        </td>
                        <td className='borderless'>
                            <p className = 'companyName'>{this.props.company.name}</p>
                        </td>
                    </tr>
                </td>
                <td>{this.props.company.description}</td>
                <td>{this.props.company.funding ? this.props.company.funding.toLocaleString('en-US') + ' $' : '-'}</td>
                <td>{this.props.company.employees}</td>
                <td>{this.props.company.tags}</td>
                <td>{this.props.company.stageName}</td>
                <td>{this.props.company.foundedOn.substring(0, 4)}</td>
            </tr>
        );
    }

}

CompanyRow.propTypes = {
    company: PropTypes.object.isRequired
};
export default CompanyRow;
