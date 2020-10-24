
const {Workspace} = require('../models');
const {ConflictError, ValidationError} = require('../errors/CustomErrors');
const {fieldIsRequired, isAlreadyInUse} = require('../constants/defaultMessages');



const createWorkspace = async (workspaceToCreate, user) => {
  const {name, subDomain} = workspaceToCreate;

  if (!name) throw new ValidationError({name: fieldIsRequired})
  if (!subDomain) throw new ValidationError({subDomain: fieldIsRequired})

  const workspace = await Workspace.findOne({where: {subDomain}});

  if (workspace) {
    throw new ConflictError({subDomain: `${subDomain} ${isAlreadyInUse}` })
  }

  return Workspace.create({userId: user.id, name, subDomain});
}


const getUserWorkspaces = async (id) => {
  return await Workspace.findAll({
    where: {userId: id},
    raw: true
  });
}


const deleteWorkspace = async (workspaceId, userId) => {
  return Workspace.destroy({where: {id: workspaceId, userId}})
}


const suggestSubdomain = async (subDomain) => {

  const checkAvailability = async (subDomain, i) => {
    let _subDomain = i !== 0 ? `${subDomain}${i}`: subDomain;
    const result = await Workspace.findOne({
      where: {subDomain: _subDomain}, raw: true
    })

    if (result !== null) {
      return await checkAvailability(subDomain, ++i)
    } else {
      return _subDomain
    }
  }

  return await checkAvailability(subDomain, 0);

}


module.exports = {
  createWorkspace,
  getUserWorkspaces,
  deleteWorkspace,
  suggestSubdomain
};
