import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyRow from '../../components/table/CompanyRow';
import Table from 'react-bootstrap/lib/Table';

const changeOrder = (array, sortBy, order) => {
    const newOrder = R.sortBy(R.compose(R.toLower, R.prop(sortBy)))(array);
    // console.log(newOrder);
    if (order === 'desc') {
        return newOrder;
    }
    return R.reverse(newOrder);
};

class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: props.data,
            sortBy: 'name',
            order: null
        };
        // console.log(this.state.companies)

        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleNameClick(e) {
        let newState = R.merge(this.state);
        if (this.state.order === 'asc' || this.state.order === null) {
            newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'desc'), order: 'desc'});
        } else {
            newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'asc'), order: 'asc'});
        }
        this.setState({companies: newState.companies, sortBy: 'name', order: newState.order});
    }

    render() {
        // const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
        // console.log(this.state.companies['name'])
        // console.log(sortByNameCaseInsensitive(this.state.companies))
        return (
            <div>
                <h3>Table view</h3>
                <Table responsive bordered>
                    <thead>
                    <tr>
                        <th onClick={(e) => this.handleNameClick(e)}>Company</th>
                        <th>Funding</th>
                        <th>Employees</th>
                        <th>Tags</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.companies.map((comp) => {
                        return (<CompanyRow key={comp.slug} company={comp}/>);
                    })}
                    </tbody>

                </Table>

            </div>
        );
    }
}

TableView.propTypes = {
    data: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default TableView;
