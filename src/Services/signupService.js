
const User = require('../LocalModels/user');
const JwtTokenHelper = require('../Helpers/jwtTokenHelper');

async function isUserAlreadyExist(email) {
    try {
        let user = await User.findEmailId(email.toLowerCase());
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
                let savedUser = await User.save(userData);
                let jwtToken = signUpJwtToken(savedUser);
                let response = { statusCode: 201, message: 'Sign up successfully', jwtToken: jwtToken };
                return response;
            }
        } catch (error) {
            return error;
        }
};

function signUpJwtToken(user) {
    let obj = {
        userId: user.user_id,
        email: user.email
    }
    let jwtToken = JwtTokenHelper.tokenGenerator(obj, '1 day');
    return jwtToken;
}