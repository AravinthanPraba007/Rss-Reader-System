// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const {User} = require('../../models');
const bcrypt = require('bcrypt');
const StatusMessage = require('../Constants/statusMessages');
const StatusCode = require('../Constants/statusCode');


async function findByCredentials(userData) {
        try {
            let user = await User.findOne({
                where: {
                    email: userData.email.toLowerCase()
                }
            });
            if(!user){
                return ({
                    statusCode: StatusCode.Unauthorized,
                    message: StatusMessage.Login_Invalid_Email_Message
                })
            }
            if (user && await authenticate(userData.password, user.dataValues.password)) {
                return ({
                    statusCode: StatusCode.Success,
                    message: StatusMessage.Login_Success_Messages,
                    user: user.dataValues
                });
            }
            else {
                return ({
                    statusCode: StatusCode.Unauthorized,
                    message: StatusMessage.Login_Invalid_Password_Message
                })
            }
        } catch (error) {
            return (error);
        }
};
 

module.exports.loginUser = async (userData) => {
    try {
        let data = await findByCredentials(userData);
        if (data.statusCode === StatusCode.Success) {
            let jwtToken = loginJwtToken(data.user);
            var response = { message : data.message, statusCode: data.statusCode, jwtToken: jwtToken };
            return response;
        } else {
            let response = { message : data.message, statusCode: data.statusCode };
            return response;
        }              
      } catch (error) {
         return error;
      }  
}

function loginJwtToken(user) {
    let obj = {
        userId : user.id,
        email : user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}

async function authenticate(loginPassword, hashPassword) {
    const result = await bcrypt.compare(loginPassword, hashPassword);
    return result;
}