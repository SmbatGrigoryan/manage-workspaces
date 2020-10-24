import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import remote from '../../utils/request'


import {
  signupSuccess,
  signupFail,
  verifySuccess,
  verifyFail,
  createWorkspaceSuccess,
  createWorkspaceFail,
  getWorkspacesSuccess,
  getWorkspacesFail,
  deleteWorkspaceSuccess,
  deleteWorkspaceFail
} from './actions';


import {
  SIGNUP_START,
  VERIFY_START,
  CREATE_WORKSPACE_START,
  GET_WORKSPACES_START,
  DELETE_WORKSPACE_START
} from './constants';


export default function* watchAppSaga() {
  yield takeLatest(SIGNUP_START, _signupStart);
  yield takeLatest(VERIFY_START, _verifyStart);
  yield takeLatest(CREATE_WORKSPACE_START, _createWorkspace);
  yield takeLatest(GET_WORKSPACES_START, _getWorkspaces);
  yield takeLatest(DELETE_WORKSPACE_START, _deleteWorkspace);
}


function* _signupStart(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/signup`;
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.success) {
      yield put(signupSuccess(response.data));
    } else {
      yield put(signupFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _verifyStart(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/verify-email`;
  // todo
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'PATCH',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.success) {
      yield put(verifySuccess(response.data));
    } else {
      yield put(verifyFail(response.error));
      // todo handel error
    }
  } catch (e) {
    console.log(e);
  }
}


function* _createWorkspace(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/workspaces`;
  const token = localStorage.getItem('token');
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    if (response.success) {
      yield put(createWorkspaceSuccess(response.data));
    } else {
      yield put(createWorkspaceFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _getWorkspaces(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/workspaces`;
  const token = localStorage.getItem('token');
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'GET',
      body: JSON.stringify(action.data),
      headers: {
        'Authorization': token,
      }
    });
    if (response.success) {
      yield put(getWorkspacesSuccess(response.data));
    } else {
      yield put(getWorkspacesFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}




function* _deleteWorkspace(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/workspaces`;
  const token = localStorage.getItem('token');
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'DELETE',
      body: JSON.stringify({id: action.data}),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    if (response.success) {
      yield put(deleteWorkspaceSuccess(response.data));
    } else {
      yield put(deleteWorkspaceFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}
