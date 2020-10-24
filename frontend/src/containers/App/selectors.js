import {createSelector} from 'reselect';

const selectGlobal = state => state['global'];

export const makeSelectValidationError = createSelector(
  selectGlobal,
  global => global.validationErrors
);

export const makeSelectSignupSuccess = createSelector(
  selectGlobal,
  global => global.signupSuccess
);
export const makeSelectCreateWorkspaceSuccess = createSelector(
  selectGlobal,
  global => global.createWorkspaceSuccess
);

export const makeSelectDeleteWorkspaceSuccess = createSelector(
  selectGlobal,
  global => global.deleteWorkspaceSuccess
);

export const makeSelectGetWorkspacesSuccess = createSelector(
  selectGlobal,
  global => global.getWorkspacesSuccess
);

export const makeSelectWorkspaces = createSelector(
  selectGlobal,
  global => global.workspaces
);

export const makeSelectVerifySuccess = createSelector(
  selectGlobal,
  global => global.verifySuccess
);

export const makeSelectServerError = createSelector(
  selectGlobal,
  global => global.serverErrors
);

export const makeSelectAuthorizationError = createSelector(
  selectGlobal,
  global => global.authorizationError
);

export const makeSelectIsAuthenticated = createSelector(
  [selectGlobal],
  global => global.isAuthenticated
);

export const makeSelectUser = createSelector(
  selectGlobal,
  global => global.user
);


