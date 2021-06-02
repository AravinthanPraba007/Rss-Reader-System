const User = require('../LocalModels/user');
const db = require("../Models/index");
const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');

async function findByCredentials(userData) {
        try {
            let user = await UserModel.findAll({
                where: {
                    email: userData.email.toLowerCase()
                }
            })
            if(user && user.length === 0){
                return ({
                    statusCode: 401,
                    message: 'Invalid Email Id provided'
                })
            }
            userValue = user[0].dataValues;
            if (user && User.authenticate(userValue.password, userData.password)) {
                return ({
                    statusCode: 200,
                    message: 'Successfully logged-in',
                    user: userValue
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