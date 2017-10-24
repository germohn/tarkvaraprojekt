import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import CompanyCard from '../../components/card/CompanyCard';


class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name',
      order: 'asc',
      showCount: 10,
      showInRow: 3,
      unSelectedTags: props.tags.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }),
      selectedTags: [],
      unSelectedStages: props.stages,
      selectedStages: [],
      companies: R.sortBy(R.compose(R.toLower, R.prop('name')))(props.data),
      search: ''

    };
  }

  render() {
    return (
      <div className="wrapper">
        <h3> Cardview</h3>
      <section className = "cardView">
      {this.state.companies.map((comp, i) => {
        if (i <= this.state.showCount) {
            return (<CompanyCard key={comp.slug} company={comp}/>);
        }
      })
  }
      </section>
      </div>
  )
    ;
  }
}

CardView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  tags: PropTypes.array.isRequired,
  stages: PropTypes.object.isRequired
};

export default CardView;
