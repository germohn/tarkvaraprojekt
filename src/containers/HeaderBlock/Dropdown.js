import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';
import onClickOutside from 'react-onclickoutside';

class DropDown extends Component {
  handleClickOutside() {
    this.props.close();
  }

  render() {
    return (
      <Panel className="dropdown" collapsible expanded={this.props.show}>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 tagsContainer">
            {this.props.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 stagesContainer">
            {this.props.renderStages()}
          </div>
        </div>
      </Panel>
    );
  }
}

DropDown.propTypes = {
  renderTags: PropTypes.func.isRequired,
  renderStages: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default onClickOutside(DropDown);
