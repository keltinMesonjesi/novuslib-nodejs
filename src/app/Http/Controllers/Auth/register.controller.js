/**
 * Auth register controller
 */
const httpStatus = require('http-status');
const User = require('../../../Models/user.model');
const { isUniqueInTable } = require('../../../Providers/validation.provider');

/**
 * Handle new user registration request
 * @param req
 * @param res
 * @return JSON response
 */
const register = async (req, res) => {
  await User.create({
    uid: 'qwerty1234',
    username: 'Thictiveracy812',
    email: 'email1@example.com',
    password: 'password',
  });

  res.status(httpStatus.CREATED).send({
    status: 'success',
    data: {
      resource: {
        type: 'user',
        id: 'eyJpdiI6IjNKNlEyZWFLdmhsM0tuQ29wVW9Pd3c9PSIsInZhbHVlIjoieldJbGFBbk0xeS9PRUNBeU5oUnFlQT09IiwibWFjIjoiMjYwNTc3NzVhNzAyZjZkNTA2YjgzZWZhMjg0YTE4ZDQ0NWMwNDllMDU3N2JiMWY4MDIwZTEyZDllMjYxZDNmNSIsInRhZyI6IiJ9',
        uid: '9ACB7973E1474EF09F063E359E531A9D',
        attributes: {
          username: 'Thictiveracy81',
          email: 'email@example.com',
          detail: {
            firstname: 'Max',
            lastname: 'Powers',
            phone_number: '567-227-9504',
            address: '424 N PALM DR BEVERLY HILLS CA 90210-3965 USA',
          },
        },
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
