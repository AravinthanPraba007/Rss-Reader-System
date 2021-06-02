
// const LocalUserModel = require('../LocalModels/user');
// const db = require("../DbModels/index");
// const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');
const {User} = require('../../models');

async function isUserAlreadyExist(email) {
    try {
        let user = await User.findOne({
            where: {
                email: email.toLowerCase()
            }
        });
        console.log(user);
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
            let data = await isUserAlreadyExist(userData.email);
            if (data) {
                let response = { statusCode: 409, message: 'User already exist' };
                return response;
            } else {
                let savedUser = await User.create({name: userData.name, email: userData.email, password: userData.password});
                let jwtToken = signUpJwtToken(savedUser.dataValues);
                let response = { statusCode: 201, message: 'Sign up successfully', jwtToken: jwtToken };
                return response;
            }
        } catch (error) {
            return error;
        }
};

function signUpJwtToken(user) {;
    let obj = {
        userId: user.uuid,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}



