// import React from 'react';
// import CompanyRow from "./CompanyRow";
//
//
// class TableBody extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             companies: props.data,
//             sortBy: 'name',
//             order: 'asc'
//         };
//         console.log(this.state)
//     }
//
//     render() {
//         console.log(this.state.companies);
//         console.log(this.state.companies.length === 20 ? "olemas" : "ei")
//         return (this.state.companies.map((comp) => {
//             console.log(comp.name)
//             return (
//                 <tr>
//                     <td>{comp.name}</td>
//                     <td>{comp.funding ? comp.funding + ' $' : '-'}</td>
//                     <td>{comp.employees}</td>
//                     <td>{comp.tags}</td>
//                 </tr>
//             );
//         }));
//     }
//
// }
//
//
// // {props.data.map(comp => {
// //     return (<CompanyRow company={comp}/>)
// // })}
// export default TableBody;
