
// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const {User} = require('../../models');
const bcrypt = require('bcrypt');
const StatusMessage = require('../Constants/statusMessages');

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

function signUpJwtToken(user) {;
    let obj = {
        userId: user.id,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}



