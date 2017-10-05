import React from 'react';

class CompanyRow extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.company)
  }

  render() {
    return (
      <tr >
        <td >{this.props.company.name}</td >
        <td >{this.props.company.funding ? this.props.company.funding + ' $' : '-'}</td >
        <td >{this.props.company.employees}</td >
        <td >{this.props.company.tags}</td >
      </tr >
    );
  }

}


export default CompanyRow;
