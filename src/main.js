import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import helloSaga from './sagas'

import Game from './containers/game'

import * as reducers from './reducers/index'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(helloSaga);

ReactDOM.render((
  <Provider store={store}>
    <Game/>
  </Provider>
), document.getElementById('root'));