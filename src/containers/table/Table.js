import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyRow from '../../components/table/CompanyRow';
import Buttons from '../../components/table/Buttons';

const changeOrder = (array, sortBy, order) => {
  const newOrder = R.sortBy(R.compose(R.toLower, R.prop(sortBy)))(array);
  if (order === 'desc') {
    return R.reverse(newOrder);
  }
  return newOrder;
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
  if (order === 'desc') {
    const sortByDesc = R.sortWith([
      R.descend(R.prop(sortBy)),
      R.ascend(R.compose(R.toLower(), R.prop('name')))
    ]);
    const newOrder = sortByDesc(definedArray);
    return newOrder.concat(undefinedArray);
  } else {
    const sortByAsc = R.sortWith([
      R.ascend(R.prop(sortBy)),
      R.ascend(R.compose(R.toLower(), R.prop('name')))
    ]);
    const newOrder = sortByAsc(definedArray);
    return newOrder.concat(undefinedArray);
  }
};


const filterCompanies = (companies, stages, tags) => {
  if (stages.length <= 0 && tags.length <= 0) {
    return companies;
  } else if (stages.length <= 0 && !(tags.length <= 0)) {
    let comps = [];
    tags.forEach((tag) => {
      companies.forEach((comp) => {
        if (comp.tags && comp.tags.includes(tag)) {
          comps.push(comp);
        }
      });
    });
    return R.uniq(comps);
  } else if (!(stages.length <= 0) && tags.length <= 0) {
    let comps = [];
    stages.forEach((stage) => {
      companies.forEach((comp) => {
        if (comp.stage && stages.includes(comp.stageName)) {
          comps.push(comp);
        }
      });
    });
    return R.uniq(comps);
  } else if (!(stages.length <= 0) && !(tags.length <= 0)) {
    let comps = [];
    stages.forEach((stage) => {
      tags.forEach((tag) => {
        companies.forEach((comp) => {
          if (comp.stage && stages.includes(comp.stageName) && comp.tags && comp.tags.includes(tag)) {
            comps.push(comp);
          }
        });
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
      order: 'asc',
      showCount: 10,
      unSelectedTags: props.tags.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }),
      selectedTags: [],
      unSelectedStages: Array.from((props.stages).values()),
      selectedStages: [],
      companies: R.sortBy(R.compose(R.toLower, R.prop('name')))(props.data),
      search: '',
      allstages: Array.from((props.stages).values())
    };

    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleSortingClick = this.handleSortingClick.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleStageSelect = this.handleStageSelect.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.showMore = this.showMore.bind(this);
    this.showAll = this.showAll.bind(this);
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
    if (this.state.sortBy != 'name') {
      newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'asc'), order: 'asc'});
    } else {
      if (this.state.order === 'asc') {
        newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'desc'), order: 'desc'});
      } else {
        newState = R.merge(newState, {companies: changeOrder(this.state.companies, 'name', 'asc'), order: 'asc'});
      }
    }
    this.setState({companies: newState.companies, sortBy: 'name', order: newState.order});
  }

  handleSortingClick(e, sortBy) {
    let newState = R.clone(this.state);
    if (this.state.sortBy != sortBy) {
      newState = R.merge(newState, {companies: changeNumOrder(this.state.companies, sortBy, 'desc'), order: 'desc'});
    } else {
      if (this.state.order === 'desc') {
        newState = R.merge(newState, {companies: changeNumOrder(this.state.companies, sortBy, 'asc'), order: 'asc'});
      } else {
        newState = R.merge(newState, {companies: changeNumOrder(this.state.companies, sortBy, 'desc'), order: 'desc'});
      }
    }
    this.setState({companies: newState.companies, sortBy: sortBy, order: newState.order});
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
    unSelected.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    this.setState({
      unSelectedTags: unSelected,
      selectedTags: selected
    });
  }

  handleStageSelect(stage) {
    const unSeleceted = this.state.unSelectedStages;
    const index = unSeleceted.indexOf(stage);
    unSeleceted.splice(index, 1);
    const selected = this.state.selectedStages;
    selected.push(stage);
    this.setState({
      unSelectedStages: unSeleceted,
      selectedStages: selected
    });
  }

  handleStageDeselect(stage) {
    const selected = this.state.selectedStages;
    const index = selected.indexOf(stage);
    selected.splice(index, 1);
    const unSelected = this.state.allstages.filter((val) => selected.indexOf(val) < 0);
    this.setState({
      unSelectedStages: unSelected,
      selectedStages: selected
    });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 10)
    });
  }

  sortResult(result) {
    if (this.state.sortBy == 'name') {
      return changeOrder(result, this.state.sortBy, this.state.order);
    } else {
      return changeNumOrder(result, this.state.sortBy, this.state.order);
    }
  }

  render() {
    const filteredCompanies = filterCompanies(this.state.companies, this.state.selectedStages,
      this.state.selectedTags);
    let searchResultsUnSorted = filteredCompanies.filter((comp) => {
      return comp.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    let searchResults = this.sortResult(searchResultsUnSorted);
    return (
      <div className="container">
        <div className="row">
          <h3>Tags</h3>
          {
            this.state.unSelectedTags.map((tag, i) => {
              return (
                <div className="chip" key={i} onClick={(e) => this.handleTagSelect(tag)}>{tag}</div>);
            })
          }
        </div>
        <div className="row">
          <h4>Selected tags</h4>
          {
            this.state.selectedTags.map((tag, i) => {
              return (
                <div className="chip" key={i} onClick={(e) => this.handleTagDeselect(tag)}>{tag}</div>);
            })
          }
        </div>
        <div className="row">
          <h3>Stages</h3>
          {
            this.state.unSelectedStages.map((stage, i) => {
              return (
                <div className="chip" key={i} onClick={(e) =>
                  this.handleStageSelect(stage)}>{stage}</div>);
            })
          }
        </div>
        <div className="row">
          <h4>Selected stages</h4>
          {
            this.state.selectedStages.map((stage, i) => {
              return (
                <div className="chip" key={i} onClick={(e) =>
                  this.handleStageDeselect(stage)}>{stage}</div>);
            })
          }
        </div>
        <div className="row">
          <div className="table-responsive">
            <h3>Table view</h3>
            <div id="leftAlignedContainer" className="row">
              <input id="searchBox" type="text" placeholder="Search by name..." value={this.state.search}
                     onChange={(event) => this.updateSearch(event)}/>
              <i className="glyphicon glyphicon-search"></i>
            </div>
            <table className="table">
              <thead>
              <tr>
                <th id='companyCol' onClick={(e) => this.handleNameClick(e)}>Company
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='fundingCol' onClick={(e) => this.handleSortingClick(e, 'funding')}>Funding
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='employeesCol' onClick={(e) => this.handleSortingClick(e, 'employees')}>Employees
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='tagsCol'>Tags</th>
                <th id='stageCol'>Stage</th>
                <th id='foundedCol' onClick={(e) => this.handleSortingClick(e, 'foundedOn')}>Founded
                  <i className="fa fa-fw fa-sort"/></th>
              </tr>
              </thead>
              <tbody>
              {searchResults.map((comp, i) => {
                if (i <= this.state.showCount)
                  return (<CompanyRow key={comp.slug} company={comp}/>);
              })}
              </tbody>
            </table>
            <Buttons showMore={this.showMore} showAll={this.showAll}
                     limit={this.state.showCount} length={searchResults.length}/>
          </div>
        </div>
      </div>
    );
  }
}

TableView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  tags: PropTypes.array.isRequired,
  stages: PropTypes.object.isRequired,

};

export default TableView;
