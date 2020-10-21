const Joi = require('joi');

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_]).{8,}$/;
const {passwordValidationErr, fieldIsRequired} = require('../constants/defaultMessages');

const newUser = (credentials) => {

  let objToValidate = {};

  // escaping  undefined values
  Object.entries(credentials)
    .forEach((item) => {
      if (item[1]) objToValidate[item[0]] = item[1];
    });

  const schema = Joi.object().keys({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    fullName: Joi.string().min(5).max(72).required(),
    password: Joi.string().regex(passwordRegex).required(),
  });

  const result = schema.validate(objToValidate, {abortEarly: false});

  let validationResultObj = {};
  if (result.error !== undefined) {
    result.error.details.forEach(errItem => {
      errItem.message.includes('password') ? (
        validationResultObj[errItem.path[0]] = passwordValidationErr
      ) : (
        validationResultObj[errItem.path[0]] = errItem.message
          .substring(errItem.message.indexOf(" ") + 1, errItem.message.length)
      )
    });

    return validationResultObj;
  }

  return null;

};


module.exports = {
  newUser
};
