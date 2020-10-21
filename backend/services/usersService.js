const bcrypt = require('bcryptjs');
const crypto = require("crypto");


// const {jwtSign, jwtVerify} = require('./util');
const {User, sequelize} = require('../models');
const mailer = require('../services/mailer');

const {
  BadRequestError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowed,
  ConflictError,
  ValidationError,
  InternalError
} = require('../errors/CustomErrors');

const {
  notAvailableEmail,
  wrongCredentials,
  emailVerificationText,
  isAlreadyVerifiedError
} = require('../constants/defaultMessages');


const createUser = async (_user) => {
  const t = await sequelize.transaction();

  try {
    const {email, fullName, password} = _user;

    const [user, hashedPassword] = await Promise.all([
      User.findOne({where: {email}}),
      bcrypt.hash(password, 10)
    ])
    const emailVerificationToken = crypto.randomBytes(3).toString('hex');

    if (user && user.dataValues.emailIsVerified) {
      throw new ConflictError({email: notAvailableEmail})
    } else if (user && !user.dataValues.emailIsVerified) {
      await User.update(
        {fullName, password: hashedPassword, emailVerificationToken},
        {
          where: {email},
          transaction: t
        }
      )
    } else {
      await User.create(
        {email, fullName, password: hashedPassword, emailVerificationToken},
        {transaction: t}
      )
    }

    await mailer(
      process.env.TRANSPORTER_EMAIL,      //TRANSPORTER_EMAIL
      process.env.TRANSPORTER_PASSWORD,   //TRANSPORTER_PASSWORD
      email,                              // to
      'Please verify your account email',             //subject
      `${emailVerificationText}
                     ${emailVerificationToken}`, // text
      // html
    )

    await t.commit();
    return {email, fullName}

  } catch (e) {
    console.log(e)
    await t.rollback();
    throw e
  }
};


const verifyEmail = async (_user) => {

  const {email, emailVerificationToken} = _user;
  const userToVerify = await User.findOne({where: {email}})

  if (! userToVerify) {
    throw new NotFoundError({email: wrongCredentials})
  }
  if (userToVerify && userToVerify.dataValues.emailIsVerified) {
    throw new ConflictError({email: isAlreadyVerifiedError})
  }
  if (userToVerify.dataValues.emailVerificationToken !== emailVerificationToken) {
    throw new ValidationError({emailVerificationToken: wrongCredentials})
  }
  await userToVerify.update({emailIsVerified: true, emailVerificationToken: ''})

  return
}


module.exports = {
  createUser,
  verifyEmail
};
