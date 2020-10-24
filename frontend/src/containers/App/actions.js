import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CREATE_WORKSPACE_START,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_FAIL,
  DELETE_WORKSPACE_START,
  DELETE_WORKSPACE_SUCCESS,
  DELETE_WORKSPACE_FAIL,
  GET_WORKSPACES_START,
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_FAIL,
  VALIDATION_ERROR,
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  SERVER_ERROR,
  RESET_SERVER_ERROR,
  RESET_VALIDATIONS_ERRORS,
  RESET_AUTHORIZATION_ERROR
} from './constants';


export const deleteWorkspaceStart = (data) => {
  return {type: DELETE_WORKSPACE_START, data}
};
export const deleteWorkspaceSuccess = (data) => {
  return {type: DELETE_WORKSPACE_SUCCESS, data}
};
export const deleteWorkspaceFail = (error) => {
  return {type: DELETE_WORKSPACE_FAIL, error}
};

export const getWorkspacesStart = (data) => {
  return {type: GET_WORKSPACES_START, data}
};
export const getWorkspacesSuccess = (data) => {
  return {type: GET_WORKSPACES_SUCCESS, data}
};
export const getWorkspacesFail = (error) => {
  return {type: GET_WORKSPACES_FAIL, error}
};

export const createWorkspaceStart = (data) => {
  return {type: CREATE_WORKSPACE_START, data}
};
export const createWorkspaceSuccess = (data) => {
  return {type: CREATE_WORKSPACE_SUCCESS, data}
};
export const createWorkspaceFail = (error) => {
  return {type: CREATE_WORKSPACE_FAIL, error}
};

export const signupStart = (data) => {
  return {type: SIGNUP_START, data}
};
export const signupSuccess = (data) => {
  return {type: SIGNUP_SUCCESS, data}
};
export const signupFail = (error) => {
  return {type: SIGNUP_FAIL, error}
};

export const verifyStart = (data) => {
  return {type: VERIFY_START, data}
};
export const verifySuccess = (data) => {
  return {type: VERIFY_SUCCESS, data}
};
export const verifyFail = (error) => {
  return {type: VERIFY_FAIL, error}
};

export const validationsErrors = (error) => {
  return {type: VALIDATION_ERROR, error}
};

export const resetServerErrors = () => {
  return {type: RESET_SERVER_ERROR}};

export function resetValidationsErrors() {
  return {type: RESET_VALIDATIONS_ERRORS,};
}

export function resetAuthorizationError() {
  return {type: RESET_AUTHORIZATION_ERROR};
}


