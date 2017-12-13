import Logo from '../shared/Logo';
import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {joinFoundersToList} from '../../containers/util/OtherFunctions';

const CompanyModal = (props) => {
  return (
    <Modal show={props.show} onHide={(e) => props.close(e)}>
      <Modal.Header closeButton>
        <div className="container-fluid">
          <div className="row">
          </div>
          <div className="row">
            <div className="col-lg-3 col-xs-3 col-sm-3 col-md-3 cardLogoContainer">
              <Logo url={props.company.logo100x100} view="cardView"/>
            </div>
            <div className="col-lg-9 col-xs-9 col-sm-9 col-md-9">
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
                  <p className='companyName'>{props.company.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 leftAligned">
                  <p className="tags">{props.company.tags ? props.company.tags.join('  |  ') : ''}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 descContainer">
              <p className='description'>{props.company.description}</p>
            </div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
              <b><a href={props.company.url} target="_blank">See the profile...</a></b>
            </div>
          </div>
          <div className="row modalRow">
            <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Funding:</b></div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{props.company.funding ?
                  props.company.funding.toLocaleString('en-US') + ' $' : 'unknown'}</div>
              </div>
            </div>
            <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Employees:</b></div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{props.company.employees ?
                  props.company.employees : 'unknown'}</div>
              </div>
            </div>
            <div className="col-lg-4 col-xs-4 col-sm-4 col-md-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12"><b>Founded:</b></div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">{props.company.foundedOn ?
                  props.company.foundedOn.substring(0, 4) : 'unknown'}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <b>Founders:</b>
          </div>
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 founders">
              {joinFoundersToList(props.company.founders)}
            </div>
          </div>
          <div className="row">
            <b>Investors:</b>
          </div>
          <div className="row investors">
            {props.company.investors ? props.company.investors.map((investor) => {
              return (
                <div key={investor.name} className="col-lg-3 col-xs-3 col-sm-3 col-md-3 investor col-centered">
                  <div className="row">
                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                      <Logo url={investor.logo100x100} view="cardView"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                      <b>
                        {investor.name}
                      </b>
                    </div>
                  </div>
                </div>
              );
            }) : ''}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

CompanyModal.propTypes = {
  company: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default CompanyModal;
