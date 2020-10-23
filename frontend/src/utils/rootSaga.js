import { fork} from 'redux-saga/effects';

import appSaga from '../containers/App/saga';
import loginSaga from '../containers/LogIn/saga';


export default function* rootSaga() {
  yield fork(appSaga);
  yield fork(loginSaga);
}
