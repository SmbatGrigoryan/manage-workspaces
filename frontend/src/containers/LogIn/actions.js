import {LOGIN_START, LOGIN_SUCCESS} from "./constants";


export const loginStart = (data) => {
  return {type: LOGIN_START, data}
};

export const loginSuccess = (data) => {
  return {type: LOGIN_SUCCESS, data}
};

export const loginFail = (error) => {
  return {type: error, error}
};

