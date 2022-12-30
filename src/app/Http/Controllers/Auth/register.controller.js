/**
 * Auth register controller
 */
const httpStatus = require('http-status');
const { createUser } = require('../../../Services/user.service');
const UserResource = require('../../Resources/User.Resource');
const httpLogicAction = require('../../../Utility/httpLogicAction.utility');

/**
 * Handle new user registration request
 * @param req
 * @param res
 * @return JSON response
 */
const register = async (req, res) => {
  await httpLogicAction.executeActionWithDml(res, httpStatus.CREATED, async () => {
    const user = await createUser(req.body);

    return {
      resource: {
        ...(await UserResource(user)),
      },
      options: {
        token: '2|bqzz47KigOzzgipw6YWITX7H8ElKeKrumMaEyIyV',
      },
    };
  });
};

module.exports = {
  register,
};
