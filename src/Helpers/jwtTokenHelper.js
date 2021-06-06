const JWT = require('jsonwebtoken');

let secret = {
    key: 'jksdfghreasdopujnbertujsdfgrwer'
}
module.exports.tokenGenerator= (obj, expiryTime) => {
    let jwtToken = JWT.sign(obj, secret.key, { expiresIn: expiryTime });
    return jwtToken;
}


module.exports.tokenVerifyDecoder= (token) => {
    try {
        let jwtToken = JWT.verify(token, secret.key);
        return jwtToken;
    } catch (error) {
        return error;
    }
    
}
