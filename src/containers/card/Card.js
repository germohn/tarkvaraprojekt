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

  render() {
    return (
      <div className="container">
        <div id="sortingContainer" className="row">
          <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
            Sort By:&emsp;
            <a onClick={(e) => this.props.handleNameClick(e)}>Name {this.props.renderArrow('name')}</a>
            &emsp;
            <a onClick={(e) => this.props.handleSortingClick(e, 'funding')}>
              Funding {this.props.renderArrow('funding')}</a>
          </div>
        </div>
        <div className="row">
          <div className="cardView col-lg-12 col-xs-12 col-sm-12 col-md-12">
            {this.props.data.map((comp, i) => {
              if (i < this.state.showCount) {
                return (<CompanyCard key={comp.slug} company={comp}/>);
              }
            })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
            <Buttons showMore={this.showMore} showAll={this.showAll}
                     limit={this.state.showCount} length={this.props.data.length}/>
          </div>
        </div>
      </div>
    )
      ;
  }
}

CardView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleNameClick: PropTypes.func.isRequired,
  handleSortingClick: PropTypes.func.isRequired,
  renderArrow: PropTypes.func.isRequired
};

export default CardView;
