const SignupHelper = require('../Services/signupService');
const LoginHelper = require('../Services/loginService');
const Boom = require('boom');

module.exports.userSignup = async (user, reply) => {

    try {
        let data = await SignupHelper.signUpUser(user);
    if (data.isConflictOccured) {
        return reply(Boom.conflict(data.message));
    }
    else {
        let response = reply({ message: data.message, token: data.jwtToken  });
        response.code(201);
        response.header('Authorization', data.jwtToken);
        return response;
    }
    } catch (error) {
        return reply(Boom.boomify(error));
    }
    
}

module.exports.userLogin = async (user, reply) => {
    try {
        let data = await LoginHelper.loginUser(user);
    if (!data.isLoginSuccess) {
        return reply(Boom.unauthorized(data.message));
    }
    else {
        let response = reply({ message: data.message, token: data.jwtToken });
        response.code(200);
        response.header('Authorization', data.jwtToken);
        return response;
    }
    } catch (error) {
        return reply(Boom.boomify(error));
    }
    
}