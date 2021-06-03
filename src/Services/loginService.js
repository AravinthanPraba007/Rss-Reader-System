// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const {User} = require('../../models');
const bcrypt = require('bcrypt');

async function findByCredentials(userData) {
        try {
            let user = await User.findOne({
                where: {
                    email: userData.email.toLowerCase()
                }
            });
            if(!user){
                return ({
                    statusCode: 401,
                    message: 'Invalid Email Id provided'
                })
            }
            if (user && await authenticate(userData.password, user.dataValues.password)) {
                return ({
                    statusCode: 200,
                    message: 'Successfully logged-in',
                    user: user.dataValues
                });
            }
            else {
                return ({
                    statusCode: 401,
                    message: 'Invalid password'
                })
            }
        } catch (error) {
            return (error);
        }
};
 

module.exports.loginUser = async (userData) => {
    try {
        let data = await findByCredentials(userData);
        if (data.statusCode === 200) {
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