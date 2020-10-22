const status = require('http-status');

const generateErrorResponse = require('../services/httpErrorService');
const usersService = require('../services/usersService');
const validator = require('../validators/validator');


const createUser = async (req, res) => {
  try {
    const validationErrors = validator.newUser(req.body);
    if (validationErrors !== null) {
      return res.status(status.UNPROCESSABLE_ENTITY)
        .json({message: validationErrors})
    }

    const result = await usersService.createUser(req.body);

    res.status(status.CREATED).json(result)

  } catch (e) {
    const error = {...generateErrorResponse(e)};

    if (error.status === status.UNPROCESSABLE_ENTITY || error.status === status.CONFLICT) {
      return res.status(error.status).json({message: error.data})
    }

    res.status(error.status).end();
  }
};


const verifyEmail = async (req, res) => {
  try {

    await usersService.verifyEmail(req.body);
    res.status(status.OK).end()

  } catch (e) {
    const error = {...generateErrorResponse(e)};

    if (
      error.status === status.UNPROCESSABLE_ENTITY ||
      error.status === status.CONFLICT ||
      error.status === status.NOT_FOUND
    ) {
      return res.status(error.status).json({message: error.data})
    }

    res.status(error.status).end();
  }
}


const login = async (req, res) => {
  try {

    const user = await usersService.loginGetVerifiedUser(req.body);
    await usersService.checkPassword(req.body.password, user.dataValues.password)
    const token = await usersService.generateToken(user.dataValues.id)

    res
      .set('Authorization', token)
      .status(status.OK)
      .json({email: user.dataValues.email, fullName: user.dataValues.fullName})

  } catch (e) {
    console.log(e)
    const error = {...generateErrorResponse(e)};

    if (error.status === status.UNPROCESSABLE_ENTITY) {
      return res.status(error.status).json({message: error.data})
    }

    res.status(error.status).end();
  }
}


module.exports = {
  createUser,
  verifyEmail,
  login
};
