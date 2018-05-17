import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(
    <App data={window.data}/>,
    document.getElementById('root')
);
