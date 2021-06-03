const SignupHelper = require('../Services/signupService');
const LoginHelper = require('../Services/loginService');

module.exports.userSignup =  async (user, reply) => {
    let data = await SignupHelper.signUpUser(user);
            if (data.statusCode === 201) {
                var response = reply({ message : data.message});
                response.code(data.statusCode);
                response.header('Authorization', data.jwtToken);
                return response;
            } else {
                return reply({ message: data.message}).code(data.statusCode);  
            } 
}

module.exports.userLogin =  async (user, reply) => {
    let data = await LoginHelper.loginUser(user);
            if (data.statusCode === 200) {
                var response = reply({ message : data.message});
                response.code(data.statusCode);
                response.header('Authorization', data.jwtToken);
                return response;
            } else {
                return reply({ message: data.message}).code(data.statusCode);  
            } 
}