import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'

import createHistory from 'history/createMemoryHistory'
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import {persistReducer, persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga'
import helloSaga from './sagas'

import Game from './screens/game'
import Menu from './screens/menu'
import Settings from './screens/settings'
import Rules from './screens/rules'

import * as reducers from './reducers/index'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings']
};

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistReducer(persistConfig, combineReducers({
  ...reducers,
  routing: routerReducer
})), composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  )
));

const persistor = persistStore(store);

sagaMiddleware.run(helloSaga);

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Menu}/>
          <Route path="/game" component={Game}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/rules" component={Rules}/>
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));