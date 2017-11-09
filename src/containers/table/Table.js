import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyRow from '../../components/table/CompanyRow';
import Buttons from '../../components/table/Buttons';


class TableView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCount: 10,
    };
    this.showMore = this.showMore.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  showMore(e) {
    let newLimit = R.clone(this.state.showCount) + 20;
    this.setState({showCount: newLimit});
  }

  showAll(e) {
    let newLimit = this.state.companies.length;
    this.setState({showCount: newLimit});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="table-responsive">
            <h3>Table view</h3>

            <table className="table">
              <thead>
              <tr>
                <th id='companyCol' onClick={(e) => this.props.handleNameClick(e)}>Company
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='fundingCol' onClick={(e) => this.props.handleSortingClick(e, 'funding')}>Funding
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='employeesCol' onClick={(e) => this.props.handleSortingClick(e, 'employees')}>Employees
                  <i className="fa fa-fw fa-sort"/></th>
                <th id='tagsCol'>Tags</th>
                <th id='stageCol'>Stage</th>
                <th id='foundedCol' onClick={(e) => this.props.handleSortingClick(e, 'foundedOn')}>Founded
                  <i className="fa fa-fw fa-sort"/></th>
              </tr>
              </thead>
              <tbody>
              {this.props.data.map((comp, i) => {
                if (i <= this.state.showCount - 1)
                  return (<CompanyRow key={comp.slug} company={comp}/>);
              })}
            </tbody>
            </table>
            <Buttons showMore={this.showMore} showAll={this.showAll}
                     limit={this.state.showCount} length={this.props.data.length}/>
          </div>
        </div>
      </div>
    );
  }
}

TableView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleNameClick: PropTypes.func.isRequired,
  handleSortingClick: PropTypes.func.isRequired,
};

export default TableView;
