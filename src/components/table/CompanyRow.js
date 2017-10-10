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
                <td>{this.props.company.name}</td>
                <td>{this.props.company.funding ? this.props.company.funding + ' $' : '-'}</td>
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
