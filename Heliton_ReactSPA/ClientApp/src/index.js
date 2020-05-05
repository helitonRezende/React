import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

//var isChrome = !!window.chrome && !isOpera;
//if (isChrome) {
//    console.log("crommer");
//}
//else {
//    console.log("nao");
//}


ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);
