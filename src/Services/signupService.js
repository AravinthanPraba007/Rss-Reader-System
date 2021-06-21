
// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const {User} = require('../../models');
const bcrypt = require('bcrypt');
const StatusMessage = require('../Constants/statusMessages');
const {OAuth2Client} = require('google-auth-library');
const { googleClientId } = require('../../config');


const client = new OAuth2Client(googleClientId);

async function isUserAlreadyExist(email) {
    try {
        let user = await User.findOne({
            where: {
                email: email.toLowerCase()
            }
        });
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
    }
}



module.exports.signUpUser = async (userData) => {
        try {
            let response ={
                isConflictOccured : false
            }
            let data = await isUserAlreadyExist(userData.email);
            if (data) {
                response.isConflictOccured = true;
                response.message = StatusMessage.Signup_Already_User_Exist_Message;
                return response;
            } else {
                const saltRound = 10;
                const hashPassword = await bcrypt.hash(userData.password, saltRound);
                let savedUser = await User.create({name: userData.name, email: userData.email, password: hashPassword});
                let jwtToken = signUpJwtToken(savedUser.dataValues);
                response.message = StatusMessage.Signup_Success_Message;
                response.jwtToken = jwtToken;
                return response;
            }
        } catch (error) {
            return error;
        }
};


module.exports.googleSignUpUser = async (userData) => {
    try {

        let response ={
            isGoogleVerifyFailed : false,
            isConflictOccured : false
        }
        let userEmail;
        let userName;
        let googleResponse = await client.verifyIdToken({
            idToken: userData.token, 
            audience: googleClientId
        });
        userEmail = googleResponse.getPayload().email;
        userName = googleResponse.getPayload().name;
        console.log(googleResponse.getPayload());
        if(userEmail){
            let data = await isUserAlreadyExist(userEmail);
                if (data) {
                    response.isConflictOccured = true;
                    response.message = StatusMessage.Signup_Already_User_Exist_Message;
                    return response;
                } else {
                    const saltRound = 10;
                    const hashPassword = await bcrypt.hash("findme", saltRound);
                    let savedUser = await User.create({name: userName, email: userEmail, password: hashPassword});
                    let jwtToken = signUpJwtToken(savedUser.dataValues);
                    response.message = StatusMessage.Signup_Success_Message;
                    response.jwtToken = jwtToken;
                    return response;
                }
        }
        else {
            response.message("Google login verfication failed");
            return response;
        }



       
    } catch (error) {
        return error;
    }
};

function signUpJwtToken(user) {;
    let obj = {
        userId: user.id,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}



