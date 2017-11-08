import React from 'react';
import PropTypes from 'prop-types';
import CompanyCard from '../../components/card/CompanyCard';
import Buttons from '../../components/table/Buttons';
import R from 'ramda';


class CardView extends React.Component {
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
    let newLimit = this.props.data.length;
    this.setState({showCount: newLimit});
  }

  renderArrow(field) {
    if (this.props.sortBy === field) {
      if (this.props.order === 'asc') {
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
      <div className="wrapper">
        <h3> Cardview</h3>
        <div id="sortingContainer">
          Sort By:&emsp;
          <a onClick={(e) => this.props.handleNameClick(e)}>Name {this.renderArrow('name')}</a>
          &emsp;
          <a onClick={(e) => this.props.handleSortingClick(e, 'funding')}>Funding {this.renderArrow('funding')}</a>
        </div>
        <section className="cardView">
          {this.props.data.map((comp, i) => {
            if (i < this.state.showCount) {
              return (<CompanyCard key={comp.slug} company={comp}/>);
            }
          })
          }
        </section>
        <Buttons showMore={this.showMore} showAll={this.showAll}
                 limit={this.state.showCount} length={this.props.data.length}/>
      </div>
    )
      ;
  }
}

CardView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleNameClick: PropTypes.func.isRequired,
  handleSortingClick: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};

export default CardView;
