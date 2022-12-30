/**
 * Auth register controller
 */
const httpStatus = require('http-status');
const { createUser } = require('../../../Services/user.service');
const UserResource = require('../../Resources/User.Resource');
const httpResponse = require('../../../Utility/httpResponse.utility');

/**
 * Handle new user registration request
 * @param req
 * @param res
 * @return JSON response
 */
const register = async (req, res) => {
  const user = await createUser(req.body);
  const data = {
    resource: {
      ...(await UserResource(user)),
    },
    options: {
      token: '2|bqzz47KigOzzgipw6YWITX7H8ElKeKrumMaEyIyV',
    },
  };

  httpResponse(res, data, '', httpStatus.CREATED);
};

module.exports = {
  register,
};
