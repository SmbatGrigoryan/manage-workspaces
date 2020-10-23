import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';

import Signup from '../../components/Signup';
import Verify from '../../components/Verify';
import Workspace from '../../components/Workspace';

import PublicLayout from '../PublicLayout';
import PrivateLayout from '../PrivateLayout';
import LogIn from '../LogIn';

import {
  makeSelectValidationError,
  makeSelectSignupSuccess,
  makeSelectIsAuthenticated,
  makeSelectServerError,
  makeSelectAuthorizationError,
  makeSelectUser,
  makeSelectVerifySuccess,
  makeSelectCreateWorkspaceSuccess,
  makeSelectGetWorkspacesSuccess,
  makeSelectWorkspaces,
makeSelectDeleteWorkspaceSuccess
} from './selectors';

import {
  signupStart,
  resetValidationsErrors,
  verifyStart,
  createWorkspaceStart,
  getWorkspacesStart,
  deleteWorkspaceStart
} from './actions';

class App extends Component {

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicLayout exact path='/' component={Signup}{...this.props}/>
          <PublicLayout exact path='/verify' component={Verify}{...this.props}/>
          <PublicLayout exact path='/login' component={LogIn}{...this.props}/>

          <PrivateLayout exact path='/user-workspaces' component={Workspace}{...this.props}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    validationErrors: makeSelectValidationError(state),
    serverError: makeSelectServerError(state),
    authorizationError: makeSelectAuthorizationError(state),
    isAuthenticated: makeSelectIsAuthenticated(state),
    user: makeSelectUser(state),
    signupSuccess: makeSelectSignupSuccess(state),
    verifySuccess: makeSelectVerifySuccess(state),
    createWorkspaceSuccess: makeSelectCreateWorkspaceSuccess(state),
    getWorkspacesSuccess: makeSelectGetWorkspacesSuccess(state),
    workspaces: makeSelectWorkspaces(state),
    deleteWorkspaceSuccess: makeSelectDeleteWorkspaceSuccess(state)

  }
};

const mapDispatchToProps = dispatch => {
  return {
    signupStart: data => dispatch(signupStart(data)),
    verifyStart: data => dispatch(verifyStart(data)),
    createWorkspaceStart: data => dispatch(createWorkspaceStart(data)),
    resetValidationsErrors: () => dispatch(resetValidationsErrors()),
    getWorkspacesStart: () => dispatch(getWorkspacesStart()),
    deleteWorkspaceStart: data => dispatch(deleteWorkspaceStart(data))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
