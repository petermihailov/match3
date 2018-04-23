import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'

import createHistory from 'history/createMemoryHistory'
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import createSagaMiddleware from 'redux-saga'
import helloSaga from './sagas'

import Game from './screens/game'
import Menu from './screens/menu'
import Settings from './screens/settings'

import * as reducers from './reducers/index'

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({...reducers, routing: routerReducer}), composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  )
));


sagaMiddleware.run(helloSaga);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Menu}/>
        <Route path="/game" component={Game}/>
        <Route path="/settings" component={Settings}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));