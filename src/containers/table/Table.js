import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyRow from '../../components/table/CompanyRow';

const changeOrder = (array, sortBy, order) => {
    const newOrder = R.sortBy(R.compose(R.toLower, R.prop(sortBy)))(array);
    if (order === 'desc') {
        return newOrder;
    }
    return R.reverse(newOrder);
};

const changeNumOrder = (array, sortBy, order) => {
    const undefinedArray = [];
    const definedArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][sortBy] == null) {
            undefinedArray.push(array[i]);
        } else {
            definedArray.push(array[i]);
        }
    }
    const newOrder = R.sortBy(R.prop(sortBy))(definedArray);
    if (order === 'desc') {
        return newOrder.concat(undefinedArray);
    }
    return R.reverse(undefinedArray.concat(newOrder));
};

const filterCompaniesWithTags = (companies, tags) => {
    if (tags.length <= 0) {
        return companies;
    } else {
        let comps = [];
        tags.forEach((tag) => {
            companies.forEach((comp) => {
                if (comp.tags && comp.tags.includes(tag)) {
                    comps.push(comp);
                }
            });
        });
        return R.uniq(comps);
    }
};

class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'name',
            order: null,
            unSelectedTags: props.tags,
            selectedTags: [],
            companies: props.data
        };

        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleTagSelect = this.handleTagSelect.bind(this);
    }

    handleNameClick(e) {
        let newState = R.clone(this.state);
        if (this.state.order === 'asc' || this.state.order === null) {
            newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'desc'), order: 'desc'});
        } else {
            newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'asc'), order: 'asc'});
        }
        this.setState({companies: newState.companies, sortBy: 'name', order: newState.order});
    }

    handleFundingClick(e) {
        let newState = R.clone(this.state);
        if (this.state.order === 'desc' || this.state.order === null) {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'funding', 'asc'), order: 'asc'
            });
        } else {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'funding', 'desc'), order: 'desc'
            });
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }

    handleEmployeesClick(e) {
        let newState = R.clone(this.state);
        if (this.state.order === 'desc' || this.state.order === null) {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'employees', 'asc'), order: 'asc'
            });
        } else {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'employees', 'desc'), order: 'desc'
            });
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }

    handleFoundedClick(e) {
        let newState = R.clone(this.state);
        if (this.state.order === 'desc' || this.state.order === null) {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'foundedOn', 'asc'), order: 'asc'
            });
        } else {
            newState = R.merge(newState, {
                companies: changeNumOrder(this.state.companies,
                    'foundedOn', 'desc'), order: 'desc'
            });
        }
        this.setState({companies: newState.companies, sortBy: 'funding', order: newState.order});
    }


    handleTagSelect(tag) {
        const unSeleceted = this.state.unSelectedTags;
        const index = unSeleceted.indexOf(tag);
        unSeleceted.splice(index, 1);
        const selected = this.state.selectedTags;
        selected.push(tag);
        this.setState({
            unSelectedTags: unSeleceted,
            selectedTags: selected
        });
    }

    handleTagDeselect(tag) {
        const selected = this.state.selectedTags;
        const index = selected.indexOf(tag);
        selected.splice(index, 1);
        let unSelected = this.state.unSelectedTags;
        unSelected.push(tag);

        this.setState({
            unSelectedTags: unSelected,
            selectedTags: selected
        });
    }


    render() {
        const filteredCompanies = filterCompaniesWithTags(this.state.companies, this.state.selectedTags);
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.unSelectedTags.map((tag, i) => {
                            return (
                                <div className="chip" key={i} onClick={(e) => this.handleTagSelect(tag)}>{tag}</div>);
                        })
                    }
                </div>
                <div className="row">
                    <h4>selected</h4>
                    {
                        this.state.selectedTags.map((tag, i) => {
                            return (
                                <div className="chip" key={i} onClick={(e) => this.handleTagDeselect(tag)}>{tag}</div>);
                        })
                    }
                </div>
                <div className="row">
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
                        {filteredCompanies.map((comp) => {
                            return (<CompanyRow key={comp.slug} company={comp}/>);
                        })
                        }
                        </tbody>
                    </table>
                    <button className='showAll' type="button">Show all</button>
                </div>
            </div>
        );
    }
}

TableView.propTypes = {
    data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    tags: PropTypes.array.isRequired
};

export default TableView;
