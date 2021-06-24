import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import './css/body.css';
import './css/app.css';
import './css/header.css';

import App from './App.jsx';



ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(reduxThunk))}>
    <App />
  </Provider>,
  document.getElementById('app')
);