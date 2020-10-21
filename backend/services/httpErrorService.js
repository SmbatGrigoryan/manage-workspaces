const status = require('http-status');

const {ValidationError} = require('../errors/CustomErrors');


const generateErrorResponse = (e, ...fields) => {
  const error = {/*status: '',*/ data: {}};

  if (e instanceof ValidationError) {
    if (typeof e.data === 'object') {
      error.data = e.data
    } else {
      fields.forEach(field => error.data[field] = e.data)
    }

    error['status'] = e.status;
    return error;
  }


  e.status ? error['status'] = e.status: error['status'] = status.INTERNAL_SERVER_ERROR;

  error.data = e.data;

  return error

};

module.exports = generateErrorResponse;
