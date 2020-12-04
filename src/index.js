import React from 'react';
import ReactDOM from 'react-dom';
import ReactNotification from 'react-notifications-component';

import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import './index.css';
import 'react-notifications-component/dist/theme.css';

ReactDOM.render(
    [<ReactNotification />,
    <App />],
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
