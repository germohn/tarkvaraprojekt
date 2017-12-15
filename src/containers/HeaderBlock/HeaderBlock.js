import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import TableView from '../table/Table';
import {changeNumOrder, changeOrder, filterCompanies} from '../util/SortAndFilterFunctions';
import CardView from '../card/Card';
import {Button, Nav, NavItem} from 'react-bootstrap';
import Statistics from '../statistics/Statistics';
import DropDown from './Dropdown';


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
      activeTab: '1',
      filterOpen: false
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
    this.renderFilter = this.renderFilter.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.hadleStageClick = this.handleStageClick.bind(this);
    this.renderSelectedTagsandStages = this.renderSelectedTagsandStages.bind(this);
    this.rederClearFilterButton = this.renderClearFilterButton.bind(this);
    this.renderStageComponent = this.renderStageComponent.bind(this);
    this.renderTagsComponent = this.renderTagsComponent.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
  }

  closeFilter() {
    this.setState({filterOpen: false});
  }

  onClearFiltering(e) {
    this.setState({
      unSelectedTags: this.temp,
      selectedTags: [],
      unSelectedStages: this.state.allstages,
      selectedStages: []
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

  handleTagClick(tag) {
    if (this.state.selectedTags.includes(tag)) {
      this.handleTagDeselect(tag);
    } else {
      this.handleTagSelect(tag);
    }
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

  handleStageClick(tag) {
    if (this.state.selectedStages.includes(tag)) {
      this.handleStageDeselect(tag);
    } else {
      this.handleStageSelect(tag);
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

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 25)
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
      <div>
        <div className="row">
          <div className="col-lg-1 col-xs-1 col-sm-1 col-md-1 leftAligned">
            <h4>Tags:</h4>
          </div>
          <div className="col-lg-11 col-xs-11 col-sm-11 col-md-11">
            {this.state.alltags.map((tag, i) => {
              let style = '';
              if (this.state.selectedTags.includes(tag)) style = 'selectedChip';
              else style = 'chip';
              return (
                <div className={style} key={i} onClick={(e) => this.handleTagClick(tag)}>{tag}</div>
              );
            })
            }
          </div>
        </div>
      </div>
    );
  }

  renderStageComponent() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-1 col-xs-1 col-sm-1 col-md-1 leftAligned">
            <h4>Stages:</h4>
          </div>
          <div className="col-lg-11 col-xs-11 col-sm-11 col-md-11">
            {this.state.allstages.map((stage, i) => {
              let style = '';
              if (this.state.selectedStages.includes(stage)) style = 'selectedChip';
              else style = 'chip';
              return (
                <div className={style} key={i} onClick={(e) =>
                  this.handleStageClick(stage)}>{stage}</div>);
            })
            }
          </div>
        </div>
      </div>
    );
  }

  renderClearFilterButton() {
    if (this.state.selectedTags.length > 0 || this.state.selectedStages.length > 0) {
      return (
        <Button className="clearFilterButton" type="button" onClick={(e) => this.onClearFiltering()}> Clear Filtering
        </Button>
      );
    }
  }

  renderFilter() {
    return (
      <div className="row filterContainer">
        <div className="col-lg-3 col-xs-3 col-sm-3 col-md-3 leftAligned">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search by name..." value={this.state.search}
                   onChange={(event) => this.updateSearch(event)}/>
            <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </span>
          </div>
        </div>
        <div className="col-lg-9 col-xs-9 col-sm-9 col-md-9 leftAligned">
          <Button className="filterButton" onClick={() => this.setState({filterOpen: !this.state.filterOpen})}>
            Filter by Tags and Stages
          </Button>
          {this.renderClearFilterButton()}
          <DropDown renderTags={this.renderTagsComponent} renderStages={this.renderStageComponent}
                    show={this.state.filterOpen} close={this.closeFilter}/>
        </div>
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

  renderSelectedTagsandStages() {
    if (this.state.selectedTags.length > 0 || this.state.selectedStages.length > 0) {
      return (
        <div>
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
              {this.state.selectedTags.map((tag, i) => {
                return (
                  <div className="selectedTag" key={i} onClick={(e) => this.handleTagClick(tag)}>{tag}</div>
                );
              })
              }
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
              {this.state.selectedStages.map((stage, i) => {
                return (
                  <div className="selectedStage" key={i} onClick={(e) => this.handleStageClick(stage)}>{stage}</div>
                );
              })
              }
            </div>
          </div>
        </div>
      );
    }
  }

  renderNavBar() {
    return (
      <div className="row navBarContainer">
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
          <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.onTabSelect}>
            <NavItem id='tableView' eventKey="1">Table View</NavItem>
            <NavItem id='cardView' eventKey="2">Card View</NavItem>
            <NavItem id='statistics' eventKey="3">Aggregated Statistics</NavItem>
          </Nav>
        </div>
      </div>
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
        {this.renderFilter()}
        {this.renderSelectedTagsandStages()}
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
