import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import TableView from '../table/Table';
import {changeNumOrder, changeOrder, filterCompanies} from '../util/SortAndFilterFunctions';
import CardView from '../card/Card';
import {Nav, NavItem} from 'react-bootstrap';
import Statistics from '../statistics/Statistics';


class HeaderBlock extends React.Component {

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
      alltags: props.tags,
      allstages: Array.from((props.stages).values()),
      activeTab: '1'
    };

    const temp = props.tags;
    this.temp = temp;
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleSortingClick = this.handleSortingClick.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleStageSelect = this.handleStageSelect.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
    this.renderArrow = this.renderArrow.bind(this);
  }

  onClearTags(e) {
    this.setState({
      unSelectedTags: this.temp,
      selectedTags: []
    });
  }


  handleNameClick(e) {
    let newState = R.clone(this.state);
    if (this.state.sortBy !== 'name') {
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
    if (this.state.sortBy !== sortBy) {
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
    const unSeleceted = R.clone(this.state.unSelectedTags);
    if (this.state.unSelectedTags.includes(tag)) {
      const index = unSeleceted.indexOf(tag);
      unSeleceted.splice(index, 1);
      const selected = R.clone(this.state.selectedTags);
      selected.push(tag);
      this.setState({
        unSelectedTags: unSeleceted,
        selectedTags: selected
      });
    }
  }

  handleTagDeselect(tag) {
    const selected = R.clone(this.state.selectedTags);
    if (this.state.selectedTags.includes(tag)) {
      const index = selected.indexOf(tag);
      selected.splice(index, 1);
      let unSelected = R.clone(this.state.unSelectedTags);
      unSelected.push(tag);
      unSelected.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      this.setState({
        unSelectedTags: unSelected,
        selectedTags: selected
      });
    }
  }

  handleStageSelect(stage) {
    const unSeleceted = R.clone(this.state.unSelectedStages);
    if (this.state.unSelectedStages.includes(stage)) {
      const index = unSeleceted.indexOf(stage);
      unSeleceted.splice(index, 1);
      const selected = R.clone(this.state.selectedStages);
      selected.push(stage);
      this.setState({
        unSelectedStages: unSeleceted,
        selectedStages: selected
      });
    }
  }

  handleStageDeselect(stage) {
    const selected = R.clone(this.state.selectedStages);
    if (this.state.selectedStages.includes(stage)) {
      const index = selected.indexOf(stage);
      selected.splice(index, 1);
      const unSelected = this.state.allstages.filter((val) => selected.indexOf(val) < 0);
      this.setState({
        unSelectedStages: unSelected,
        selectedStages: selected
      });
    }
  }

  clearStages() {
    this.setState({
      unSelectedStages: this.state.allstages,
      selectedStages: []
    });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 10)
    });
  }

  sortResult(result) {
    if (this.state.sortBy === 'name') {
      return changeOrder(result, this.state.sortBy, this.state.order);
    } else {
      return changeNumOrder(result, this.state.sortBy, this.state.order);
    }
  }

  getSortedAndFilteredData() {
    const filteredCompanies = filterCompanies(this.state.companies, this.state.selectedStages,
      this.state.selectedTags);
    let searchResultsUnSorted = filteredCompanies.filter((comp) => {
      return comp.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    let searchResults = this.sortResult(searchResultsUnSorted);

    return searchResults;
  }

  renderTagsComponent() {
    return (
      <section>
        <div className="row">
          <h3>Tags</h3>
          {
            this.state.unSelectedTags.map((tag, i) => {
              return (
                <div id="chip1" className="chip" key={i} onClick={(e) => this.handleTagSelect(tag)}>{tag}</div>);
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
          <button className='showAll' type="button" onClick={(e) => this.onClearTags(e)}>Clear tags</button>
        </div>
      </section>
    );
  }

  renderStageComponent() {
    return (
      <section>
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
          <button className='showAll' type="button" onClick={(e) => this.clearStages()}>Clear stages</button>
        </div>
      </section>
    );
  }

  renderSearchBar() {
    return (
      <div className="row leftAligned">
        <input id="searchBox" type="text" placeholder="Search by name..." value={this.state.search}
               onChange={(event) => this.updateSearch(event)}/>
        <i className="glyphicon glyphicon-search"></i>
      </div>
    );
  }

  renderView(tabKey) {
    if (tabKey == 1) {
      return (
        <TableView
          data={this.getSortedAndFilteredData()}
          handleNameClick={this.handleNameClick}
          handleSortingClick={this.handleSortingClick}
          renderArrow={this.renderArrow}
        />
      );
    } else if (tabKey == 2) {
      return (
        <CardView data={this.getSortedAndFilteredData()}
                  handleNameClick={this.handleNameClick}
                  handleSortingClick={this.handleSortingClick}
                  renderArrow={this.renderArrow}
        />
      );
    } else {
      return (
        <Statistics filteredData={this.getSortedAndFilteredData()}
                    allData={this.props.data}/>
      );
    }
  }

  onTabSelect(eventKey) {
    this.setState({activeTab: eventKey});
  }

  renderNavBar() {
    return (
      <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.onTabSelect}>
        <NavItem eventKey="1">Table View</NavItem>
        <NavItem eventKey="2">Card View</NavItem>
        <NavItem eventKey="3">Aggregated Statistics</NavItem>
      </Nav>
    );
  }

  renderArrow(field) {
    if (this.state.sortBy === field) {
      if (this.state.order === 'asc') {
        return (
          <i className="fa fa-sort-desc"></i>
        );
      } else {
        return (
          <i className="fa fa-sort-asc"></i>
        );
      }
    } else {
      return (
        <i className="fa fa-fw fa-sort"/>
      );
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderTagsComponent()}
        {this.renderStageComponent()}
        {this.renderSearchBar()}
        {this.renderNavBar()}
        {this.renderView(this.state.activeTab)}
      </div>
    );
  }
}

HeaderBlock.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  tags: PropTypes.array.isRequired,
  stages: PropTypes.object.isRequired,
};

export default HeaderBlock;
