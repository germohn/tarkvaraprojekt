import React from 'react';
import PropTypes from 'prop-types';
import CompanyCard from '../../components/card/CompanyCard';


class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 10,
      showInRow: 3,
    };
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
      </div>
    )
      ;
  }
}

CardView.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default CardView;
