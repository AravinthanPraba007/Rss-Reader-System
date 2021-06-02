
const User = require('../LocalModels/user');
const db = require("../Models/index");
const UserModel = db.userModel;
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');

async function isUserAlreadyExist(email) {
    try {
        let user = await UserModel.findAll({
            where: {
                email: email.toLowerCase()
            }
        });
        if (user && user.length === 0) {
            return false;
        }
        return true;
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
                let savedUser = await UserModel.create({name: userData.name, email: userData.email, password: userData.password});
                let jwtToken = signUpJwtToken(savedUser.dataValues);
                let response = { statusCode: 201, message: 'Sign up successfully', jwtToken: jwtToken };
                return response;
            }
        } catch (error) {
            return error;
        }
};

function signUpJwtToken(user) {
    console.log(user);
    let obj = {
        userId: user.id,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}



