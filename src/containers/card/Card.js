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
      showInRow: 3,
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
      <div className="wrapper">
        <h3> Cardview</h3>
        <section className="cardView">
          {this.props.data.map((comp, i) => {
            if (i <= this.state.showCount) {
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
};

export default CardView;
