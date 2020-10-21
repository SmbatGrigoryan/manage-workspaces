const status = require('http-status');

const AppError = require('./AppError');

class BadRequestError extends AppError { // 400
  constructor(error, ...props) {
    super( ...props);
    this.status = status.BAD_REQUEST;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class AuthorizationError extends AppError { // 401
  constructor(error, ...props) {
    super(...props);
    this.status = status.UNAUTHORIZED;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class ForbiddenError extends AppError { // 403
  constructor(error, ...props) {
    super(...props);
    this.status = status.FORBIDDEN;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class NotFoundError extends AppError { // 404
  constructor(error, ...props) {
    super(...props);
    this.status = status.NOT_FOUND;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class MethodNotAllowed extends AppError { // 405
  constructor(error, ...props) {
    super(...props);
    this.status = status.METHOD_NOT_ALLOWED;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class ConflictError extends AppError { // 409
  constructor(error, ...props) {
    super(...props);
    this.status = status.CONFLICT;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class ValidationError extends AppError { // 422
  constructor(error, ...props) {
    super(...props);
    this.status = status.UNPROCESSABLE_ENTITY;
    this.type = this.constructor.name;
    this.data = error;
  }
}

class InternalError extends AppError { // 500
  constructor(...props) {
    super(...props);
    this.status = status.INTERNAL_SERVER_ERROR;
    console.log(`Got internal error.`, props);
  }
}

module.exports = {
  BadRequestError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowed,
  ConflictError,
  ValidationError,
  InternalError
};
