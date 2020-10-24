import status from 'http-status';

import * as actionCreators from '../containers/App/actions';
import {
  VALIDATION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
  DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR
} from '../containers/App/constants';

import store from '../store';


const handleErrorFromResponse = (responseStatusCode, _response) => {
  const error = {
    type: UNKNOWN_ERROR,
    message: DEFAULT_ERROR_MESSAGE
  };

  if (responseStatusCode === status.UNPROCESSABLE_ENTITY || responseStatusCode === status.CONFLICT) {
    error.type = VALIDATION_ERROR;
    store.dispatch(actionCreators.validationsErrors(_response.message));
  }

  if (responseStatusCode === 401) {

    error.type = AUTHORIZATION_ERROR
    return {...error, ..._response}
  }


  if (responseStatusCode === status.INTERNAL_SERVER_ERROR) {
    error.type = SERVER_ERROR;
    //store.dispatch(actionCreators.serverErrors(error.message));
    return error
  }

  return error
};




export default function request(url, options) {

  const returnData = {
    success: false,
    data: {},
    error: {}
  };

  store.dispatch(actionCreators.resetValidationsErrors());
  store.dispatch(actionCreators.resetServerErrors());
  store.dispatch(actionCreators.resetAuthorizationError());

  let responseStatusCode;


  return fetch(url, options)
    .then(response => {
      responseStatusCode = response.status;

      if (response.ok) {
        returnData.success = true;

        const token = response.headers.get('Authorization')

        if (token) {
          localStorage.setItem('token', token)
        }
      }

      return response.json().catch(e => console.log('invalid json', e))

    })
    .then(_response => {

      if (returnData.success) {
        returnData.data = _response
      } else {
        returnData.error = handleErrorFromResponse(responseStatusCode, _response)
      }

      return returnData
    })
    .catch(error => {
      console.log(error);
      returnData.success = false;
      returnData.error.type = UNKNOWN_ERROR;
      returnData.error.message = DEFAULT_ERROR_MESSAGE;
      return returnData;
    })
}
