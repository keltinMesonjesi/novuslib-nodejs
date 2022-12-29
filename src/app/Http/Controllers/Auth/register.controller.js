/**
 * Auth register controller
 */
const httpStatus = require('http-status');
const { createUser } = require('../../../Services/user.service');
const UserResource = require('../../Resources/User.Resource');

/**
 * Handle new user registration request
 * @param req
 * @param res
 * @return JSON response
 */
const register = async (req, res) => {
  const user = await createUser(req.body);

  res.status(httpStatus.CREATED).send({
    status: 'success',
    data: {
      resource: {
        ...(await UserResource(user)),
      },
      options: {
        token: '2|bqzz47KigOzzgipw6YWITX7H8ElKeKrumMaEyIyV',
      },
    },
  });
};

module.exports = {
  register,
};
