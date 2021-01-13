import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import App from './pages/App/App';
import API from "./API";

import './index.css';

const widgetContainer = document.getElementById('shopping-cart');
const widgetPaths = ['filter','cart'];

const pathNameArray =  window.location.pathname.split('/');

if(pathNameArray.includes('preview')) {
    pathNameArray.splice(pathNameArray.indexOf('preview') - 1, 1);
    pathNameArray.splice(pathNameArray.indexOf('preview'), 1);
}

let basename =
        pathNameArray.reduce((acc = '', path) => {
            if(!widgetPaths.includes(path)) {
                return acc + '/' + path;
            }
            return acc;
        });

basename = basename.charAt(basename.length - 1) === '/' ? basename.slice(0, -1) : basename;

API._UUID = widgetContainer?.getAttribute('data-shop-uuid');
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter basename={basename}>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
  widgetContainer
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
