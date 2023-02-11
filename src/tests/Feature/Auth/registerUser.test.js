const { app } = require('../../../bootstrap/app');
const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
// const httpMocks = require('node-mocks-http');
const { dbConnection } = require('../../../config/database');

describe('Register user test', () => {
  let newUser;
  beforeEach(() => {
    let password = faker.internet.password(8);
    newUser = {
      username: faker.internet.userName(faker.lorem.word({ min: 6 }), faker.lorem.word({ min: 6 })),
      email: faker.internet.email(),
      password: password,
      password_confirmation: password,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phone_number: faker.phone.number(),
      address: faker.address.streetAddress(),
    };
  });

  test('user_can_register', async () => {
    const res = await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.CREATED);

    expect(res.body.status).toEqual('success');
    expect(res.body.data.resource).toBeDefined();
    expect(res.body.data.options).toBeDefined();
    expect(res.body.data.options.token).toBeDefined();
    expect(res.body.data.options.token.access).toBeDefined();
    expect(res.body.data.options.token.access).not.toBeNull();
    expect(res.body.data.options.token.refresh).toBeDefined();
    expect(res.body.data.options.token.refresh).not.toBeNull();
    expect(res.body.data).toEqual({
      resource: {
        type: 'user',
        id: expect.anything(),
        uid: expect.anything(),
        attributes: {
          username: newUser.username,
          email: newUser.email,
          detail: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            phone_number: newUser.phone_number,
            address: newUser.address,
          },
        },
      },
      options: {
        token: {
          access: expect.anything(),
          refresh: expect.anything(),
        },
      },
    });
  });

  afterAll(() => {
    dbConnection.close();
  });
});
