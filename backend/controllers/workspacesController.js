const status = require('http-status');

const generateErrorResponse = require('../services/httpErrorService');
const workspacesService = require('../services/workspacesService');


const createWorkspace = async (req, res) => {
  try {

    await workspacesService.createWorkspace(req.body, req.user)
    res.status(status.CREATED).end();

  } catch (e) {
    const error = {...generateErrorResponse(e)};

    if (
      error.status === status.UNPROCESSABLE_ENTITY ||
      error.status === status.CONFLICT
    ) {
      return res.status(error.status).json({message: error.data})
    }

    res.status(error.status).end();
  }
}


const getUserWorkspaces = async (req, res) => {
  try {
    const result = await workspacesService.getUserWorkspaces(req.user.id);
    res.status(status.OK).json(result)
  } catch (e) {
    const error = {...generateErrorResponse(e)};
    res.status(error.status).end();
  }
}


const deleteWorkspace = async (req, res) => {
  try {
    const result = await workspacesService.deleteWorkspace(req.body.id, req.user.id )
    res.status(status.OK).json(result)
  } catch (e) {
    const error = {...generateErrorResponse(e)};
    res.status(error.status).end();
  }
}

const suggestSubdomain = async (req, res) => {
  try {

    const result = await workspacesService.suggestSubdomain(req.body.subDomain )
    res.status(status.OK).json(result)

  } catch (e) {
    const error = {...generateErrorResponse(e)};
    res.status(error.status).end();
  }
}

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  deleteWorkspace,
  suggestSubdomain
};
