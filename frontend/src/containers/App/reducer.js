import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL} from '../LogIn/constants';

import {
  VALIDATION_ERROR,
  RESET_VALIDATIONS_ERRORS,
  SIGNUP_SUCCESS,
  VERIFY_SUCCESS,
  CREATE_WORKSPACE_SUCCESS,
  GET_WORKSPACES_SUCCESS,
  DELETE_WORKSPACE_SUCCESS,

  AUTH_LOGOUT,
  AUTHORIZATION_ERROR,
  RESET_SERVER_ERROR,
  RESET_AUTHORIZATION_ERROR,
  UNKNOWN_ERROR,
  RESET_UNKNOWN_ERROR

} from './constants';


// The initial state of the App
const initialState = {
  isAuthenticated: '',
  loading: false,
  validationErrors: {},
  serverErrors: null,
  authorizationError: null,
  user: {},
  signupSuccess: false,
  verifySuccess: false,
  createWorkspaceSuccess: false,
  getWorkspacesSuccess: false,
  deleteWorkspaceSuccess: false,
  workspaces: [] // todo array
};


const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case VALIDATION_ERROR: {
      return Object.assign({}, state, {
        validationErrors: action.error
      });
    }

    case RESET_VALIDATIONS_ERRORS: {
      return Object.assign({}, state, {
        validationErrors: {}
      });
    }

    case SIGNUP_SUCCESS: {
      return Object.assign({}, state, {
        signupSuccess: true,
        user: action.data
      });
    }

    case GET_WORKSPACES_SUCCESS: {
      return Object.assign({}, state, {
        createWorkspaceSuccess: false,
        deleteWorkspaceSuccess: false,
        workspaces: action.data
      });
    }

    case DELETE_WORKSPACE_SUCCESS: {
      return Object.assign({}, state, {
        deleteWorkspaceSuccess: true
      });
    }

    case VERIFY_SUCCESS: {
      return Object.assign({}, state, {
        verifySuccess: true
      });
    }

    case CREATE_WORKSPACE_SUCCESS: {
      return Object.assign({}, state, {
        createWorkspaceSuccess: true
      });
    }


    case RESET_SERVER_ERROR: {
      return Object.assign({}, state, {
        serverErrors: false
      });
    }

    case RESET_AUTHORIZATION_ERROR: {
      return Object.assign({}, state, {
        authorizationError: null
      });
    }

    case LOGIN_START:
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: true
      });

    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isAuthenticated: true,
        loading: false,
        user: action.data
      })
    }

    case LOGIN_FAIL: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: false
      })
    }

    case AUTHORIZATION_ERROR: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: false,
        authorizationError: action.error
      });
    }

    case UNKNOWN_ERROR: {
      return Object.assign({}, state, {
        unknownError: action.error
      });
    }

    case RESET_UNKNOWN_ERROR: {
      return Object.assign({}, state, {
        unknownError: ''
      });
    }

    case AUTH_LOGOUT: {
      localStorage.removeItem('access_token');
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false
      });
    }


    default:
      return state

  }
};

export default appReducer;
