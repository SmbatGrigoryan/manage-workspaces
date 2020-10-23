import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import createCombineReducer from './reducers';
import rootSaga from './utils/rootSaga'


  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createCombineReducer(),
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    ));

  sagaMiddleware.run(rootSaga);


export default store;
