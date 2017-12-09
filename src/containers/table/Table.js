import React from 'react';
import PropTypes from 'prop-types';
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
    let newLimit = this.state.showCount + 20;
    this.setState({showCount: newLimit});
  }

  showAll(e) {
    let newLimit = this.props.data.length;
    this.setState({showCount: newLimit});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="table table-responsive">
            <table className="table">
              <thead>
              <tr>
                <th id='companyCol' onClick={(e) => this.props.handleNameClick(e)}>Company
                  {this.props.renderArrow('name')}</th>
                <th id='fundingCol' onClick={(e) => this.props.handleSortingClick(e, 'funding')}>Funding
                  {this.props.renderArrow('funding')}</th>
                <th id='employeesCol' onClick={(e) => this.props.handleSortingClick(e, 'employees')}>Employees
                  {this.props.renderArrow('employees')}</th>
                <th id='tagsCol'>Tags</th>
                <th id='stageCol'>Stage</th>
                <th id='foundedCol' onClick={(e) => this.props.handleSortingClick(e, 'foundedOn')}>Founded
                  {this.props.renderArrow('foundedOn')}</th>
              </tr>
              </thead>
              <tbody>
              {this.props.data.map((comp, i) => {
                if (i < this.state.showCount)
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
  renderArrow: PropTypes.func.isRequired
};

export default TableView;
