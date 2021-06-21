// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const StatusMessage = require('../Constants/statusMessages');
const {OAuth2Client} = require('google-auth-library');
const { googleClientId } = require('../../config');


const client = new OAuth2Client(googleClientId);

async function findByCredentials(userData) {
    try {
        let response = {
            isLoginSuccess: false
        }
        let user = await User.findOne({
            where: {
                email: userData.email.toLowerCase()
            }
        });
        if (!user) {
            response.message = StatusMessage.Login_Invalid_Email_Message;
            return (response);
        }
        if (user && await authenticate(userData.password, user.dataValues.password)) {
            response.isLoginSuccess = true;
            response.message = StatusMessage.Login_Success_Messages;
            response.user = user.dataValues;
            return (response);
        }
        else {
            response.message = StatusMessage.Login_Invalid_Password_Message;
            return (response);
        }
    } catch (error) {
        console.log(error);
        return (error);
    }
};


async function findByGoogleToken(token) {
    let userEmail;
    try {
        let response = {
            isLoginSuccess: false
        }
        let googleResponse = await client.verifyIdToken({
            idToken: token, 
            audience: googleClientId
        });
        userEmail = googleResponse.getPayload().email;
        if(userEmail){
            let user = await User.findOne({
                where: {
                    email: userEmail.toLowerCase()
                }
            });
            if (!user) {
                response.message = StatusMessage.Login_Invalid_Email_Message;
                return (response);
            }
            else{
                response.isLoginSuccess = true;
                response.message = StatusMessage.Login_Success_Messages;
                response.user = user.dataValues;
                return (response);
            }
        }
        else {
            response.message("Google login verfication failed");
            return response;
        }
        
                   
    } catch (error) {
        console.log(error);
        return (error);
    }
};


module.exports.googleLoginUser = async (userData) => {
    try {
        let data = await findByGoogleToken(userData.token);
        let response = {
            isLoginSuccess: data.isLoginSuccess, 
            message: data.message, 
        };
        if (response.isLoginSuccess) {
            let jwtToken = loginJwtToken(data.user); 
            response.jwtToken = jwtToken 
            return response;
        }
        else {
            return response;
        }

    } catch (error) {
        return error;
    }
}



module.exports.loginUser = async (userData) => {
    try {
        let data = await findByCredentials(userData);
        let response = {
            isLoginSuccess: data.isLoginSuccess, 
            message: data.message, 
        };
        if (response.isLoginSuccess) {
            let jwtToken = loginJwtToken(data.user); 
            response.jwtToken = jwtToken 
            return response;
        }
        else {
            return response;
        }

    } catch (error) {
        return error;
    }
}

function loginJwtToken(user) {
    let obj = {
        userId: user.id,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}

async function authenticate(loginPassword, hashPassword) {
    const result = await bcrypt.compare(loginPassword, hashPassword);
    return result;
}