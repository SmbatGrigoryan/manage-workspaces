import {combineReducers} from 'redux';

import appReducer from './containers/App/reducer';

// TODO import other reducer


export default function createCombineReducer() {
  return combineReducers({
    global: appReducer,

    //TODO other reducer HERE
  });
}
