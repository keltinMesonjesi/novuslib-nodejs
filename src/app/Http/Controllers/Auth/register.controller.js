/**
 * Auth register controller
 */
const httpStatus = require('http-status');
const { createUser } = require('../../../Services/user.service');
const { generateAuthTokens } = require('../../../Providers/auth.provider');
const UserResource = require('../../Resources/User.Resource');
const httpLogicAction = require('../../../Utility/httpLogicAction.utility');

/**
 * Handle new user registration request
 * @param req
 * @param res
 * @return JSON response
 */
const register = async (req, res) => {
  await httpLogicAction.executeActionWithDml(res, httpStatus.CREATED, async (dbTransaction) => {
    const user = await createUser(req.body, dbTransaction);

    return {
      resource: {
        ...(await UserResource(user, dbTransaction)),
      },
      options: {
        ...(await generateAuthTokens(user, dbTransaction)),
      },
    };
  });
};

module.exports = {
  register,
};
