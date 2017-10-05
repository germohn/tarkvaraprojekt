import React from 'react';
import CompanyRow from '../../components/table/CompanyRow';
import Table from 'react-bootstrap/lib/Table';

const TableView = (props) => {
  console.log('table props', props)
  return (
    <div >
      <h3 >Table view</h3 >
      <Table responsive bordered >
        <thead>
        <tr >
          <th >Company</th >
          <th >Funding</th >
          <th >Employees</th >
          <th >Tags</th >
        </tr >
        </thead>
        <tbody >
        {/*<tr >*/}
          {/*<td >{props.data[0].name}</td >*/}
          {/*<td >{props.data[0].funding}</td >*/}
          {/*<td >{props.data[0].employees}</td >*/}
          {/*<td >{props.data[0].tags}</td >*/}
        {/*</tr >*/}
        {props.data.map(comp => {
          return (<CompanyRow company={comp} />)
        })}
        </tbody >

      </Table >

    </div >
  );
};

export default TableView;
