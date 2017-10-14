import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyRow from '../../components/table/CompanyRow';

const changeOrder = (array, sortBy, order) => {
    const newOrder = R.sortBy(R.compose(R.toLower, R.prop(sortBy)))(array);
    // console.log(newOrder);
    if (order === 'desc') {
        return newOrder;
    }
    return R.reverse(newOrder);
};

const changeNumOrder = (array, sortBy, order) => {
    const undefinedArray = [];
    const definedArray = [];
    for (let i = 0; i<array.length; i++) {
        if (array[i][sortBy] == null) {
            undefinedArray.push(array[i]);
        } else{
            definedArray.push(array[i]);
        }
    }
    const newOrder = R.sortBy(R.prop(sortBy))(definedArray);
    if (order === 'desc') {
        return newOrder.concat(undefinedArray);
    }
    return R.reverse(undefinedArray.concat(newOrder));
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

    handleFundingClick(e) {
        let newState = R.merge(this.state);
        if (this.state.order === 'desc' || this.state.order === null ) {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'funding', 'asc'), order: 'asc'});
        } else {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'funding', 'desc'), order: 'desc'});
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }

    handleEmployeesClick(e) {
        let newState = R.merge(this.state);
        if (this.state.order === 'desc' || this.state.order === null ) {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'employees', 'asc'), order: 'asc'});
        } else {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'employees', 'desc'), order: 'desc'});
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }

    handleFoundedClick(e) {
        let newState = R.merge(this.state);
        if (this.state.order === 'desc' || this.state.order === null ) {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'foundedOn', 'asc'), order: 'asc'});
        } else {
            newState = R.merge(newState, {companies: changeNumOrder(this.state.companies,
                'foundedOn', 'desc'), order: 'desc'});
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }


    render() {
        // const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
        // console.log(this.state.companies['name'])
        // console.log(sortByNameCaseInsensitive(this.state.companies))
        return (
            <div>
                <h3>Table view</h3>
                <table>
                    <thead>
                        <tr>
                            <th onClick={(e) => this.handleNameClick(e)}>Company</th>
                            <th>Description</th>
                            <th onClick={(e) => this.handleFundingClick(e)}>Funding</th>
                            <th onClick={(e) => this.handleEmployeesClick(e)}>Employees</th>
                            <th>Tags</th>
                            <th>Stage</th>
                            <th onClick={(e) => this.handleFoundedClick(e)}>Founded</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.companies.map((comp) => {
                        return (<CompanyRow key={comp.slug} company={comp}/>);
                    })}
                    </tbody>
                </table>
                <button className = 'showAll' type="button">Show all</button>
            </div>
        );
    }
}

TableView.propTypes = {
    data: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default TableView;
