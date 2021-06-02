
let users = [
    {
        user_id : 1,
        name : 'Aravinthan',
        email: 'aravinthan@gmail.com',
        password: 'findme'
    }
]

function findEmailId(email) {
    console.log("Inital Users data :");
    console.log(users);
    return new Promise(async function (resolve, reject) {
    users.forEach((user) => {
        if(user.email === email) {
            return resolve(user);
        }
    })
    return resolve();
});
    
}

function save(userData) {
    userData.user_id = users.length+1;
    users.push(userData);
    console.log("After adding user");
    console.log(users);
    return userData;
}

function authenticate(userPassword, requestPassword) {
    return userPassword === requestPassword;
}

module.exports.findEmailId = findEmailId;
module.exports.save = save;
module.exports.authenticate = authenticate;