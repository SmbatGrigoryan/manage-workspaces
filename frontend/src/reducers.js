import {combineReducers} from 'redux';

import appReducer from './containers/App/reducer';

export default function createCombineReducer() {
  return combineReducers({
    global: appReducer,
  });
}
