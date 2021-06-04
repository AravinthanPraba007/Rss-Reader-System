var assert = require('chai').assert;
const Hapi = require('hapi');
const AuthRouters = require('../src/Routers/authRouters');
const StatusMessage = require('../src/Constants/statusMessages');
const StatusCode = require('../src/Constants/statusCode');
const { User } = require('../models');

const testUser = {
  "name": "Roy",
  "email": "roy@gmail.com",
  "password": "findme"
}

async function DeleteTestUser() {
  let user = await User.findOne({
    where: {
      email: testUser.email
    }
  });
  if (user) {
    await User.destroy({
      where: {
        id: user.dataValues.id
      }
    });
  }
}

describe('Auth Controller test', async function () {

  before('Check test user present in Database', async function () {
          DeleteTestUser();
  });

  

  describe('Sign up check', function () {
    describe('Sign up new user', function () {
      it('should return success response', async function () {
        const server = new Hapi.Server();
        server.connection({
          port: 8080,
          host: 'localhost',
        });
        server.route(AuthRouters);
        const injectOptions = {
          method: 'POST',
          url: '/signup',
          payload: {
            "name": testUser.name,
            "email": testUser.email,
            "password": testUser.password
          }
        }

        const response = await server.inject(injectOptions);
        const responsePayload = JSON.parse(response.payload);
        assert.equal(responsePayload.message, StatusMessage.Signup_Success_Message);
        assert.equal(response.statusCode, StatusCode.Created);
      })
    }),
      describe('Sign up again the same user', function () {
        it('should return conflict response', async function () {
          const server = new Hapi.Server();
          server.connection({
            port: 8080,
            host: 'localhost',
          });
          server.route(AuthRouters);
          const injectOptions = {
            method: 'POST',
            url: '/signup',
            payload: {
              "name": testUser.name,
            "email": testUser.email,
            "password": testUser.password
            }
          }

          const response = await server.inject(injectOptions);
          const responsePayload = JSON.parse(response.payload);
          assert.equal(responsePayload.message, StatusMessage.Signup_Already_User_Exist_Message);
          assert.equal(response.statusCode, StatusCode.Conflict);
        })
      })
  }),

  describe('Login check', function () {
    describe('Login new email', function () {
      it('should return Success Login', async function () {
        const server = new Hapi.Server();
        server.connection({
          port: 8080,
          host: 'localhost',
        });
        server.route(AuthRouters);
        const injectOptions = {
          method: 'POST',
          url: '/login',
          payload: {
            "email": testUser.email,
            "password": testUser.password
          }
        }

        const response = await server.inject(injectOptions);
        const responsePayload = JSON.parse(response.payload);
        assert.equal(responsePayload.message, StatusMessage.Login_Success_Messages);
        assert.equal(response.statusCode, StatusCode.Success);
      })
    }),
    describe('Login new email', function () {
      it('should return Unauthorized invalid email response', async function () {
        const server = new Hapi.Server();
        server.connection({
          port: 8080,
          host: 'localhost',
        });
        server.route(AuthRouters);
        const injectOptions = {
          method: 'POST',
          url: '/login',
          payload: {
            "email": testUser.email,
            "password": "find"
          }
        }

        const response = await server.inject(injectOptions);
        const responsePayload = JSON.parse(response.payload);
        assert.equal(responsePayload.message, StatusMessage.Login_Invalid_Password_Message);
        assert.equal(response.statusCode, StatusCode.Unauthorized);
      })
    }),
    describe('Login new email', function () {
      it('should return Unauthorized invalid email response', async function () {
        const server = new Hapi.Server();
        server.connection({
          port: 8080,
          host: 'localhost',
        });
        server.route(AuthRouters);
        const injectOptions = {
          method: 'POST',
          url: '/login',
          payload: {
            "email": "kdjfghj@gmail.com",
            "password": "findme"
          }
        }

        const response = await server.inject(injectOptions);
        const responsePayload = JSON.parse(response.payload);
        assert.equal(responsePayload.message, StatusMessage.Login_Invalid_Email_Message);
        assert.equal(response.statusCode, StatusCode.Unauthorized);
      })
    })
  })

  after('Remove test user present from Database', async function () {
    DeleteTestUser();
});


})