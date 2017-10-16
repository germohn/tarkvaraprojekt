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
            order: 'desc',
            showCount: 20,
            unSelectedTags: props.tags.sort(),
            selectedTags: [],
            companies: R.sortBy(R.compose(R.toLower, R.prop('name')))(props.data)
        };
        // console.log(this.state.companies)

        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleTagSelect = this.handleTagSelect.bind(this);
    }


    showMore(e) {
        let newLimit = this.state.showCount + 20;
        this.setState({showCount: newLimit});
    }

    showAll(e) {
        let newLimit = this.state.companies.length;
        this.setState({showCount: newLimit});
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
        this.setState({companies: newState.companies, sortBy: 'employees', order: newState.order});
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
        unSelected.sort();

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
                    <div className="table-responsive">
                        <h3>Table view</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th id='companyCol' onClick={(e) => this.handleNameClick(e)}>Company
                                    <i className="fa fa-fw fa-sort"/></th>
                                <th id='descriptionCol'>Description</th>
                                <th id='fundingCol' onClick={(e) => this.handleFundingClick(e)}>Funding
                                    <i className="fa fa-fw fa-sort"/></th>
                                <th id='employeesCol' onClick={(e) => this.handleEmployeesClick(e)}>Employees
                                    <i className="fa fa-fw fa-sort"/></th>
                                <th id='tagsCol'>Tags</th>
                                <th id='stageCol'>Stage</th>
                                <th id='foundedCol' onClick={(e) => this.handleFoundedClick(e)}>Founded
                                    <i className="fa fa-fw fa-sort"/></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCompanies.map((comp, i) => {
                                if (i <= this.state.showCount) return (<CompanyRow key={comp.slug} company={comp}/>);
                            })}
                            </tbody>
                        </table>
                        <button className='showAll' type="button" onClick={(e) => this.showMore(e)}>Show more</button>
                        <button className='showAll' type="button" onClick={(e) => this.showAll(e)}>Show all</button>
                    </div>
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
