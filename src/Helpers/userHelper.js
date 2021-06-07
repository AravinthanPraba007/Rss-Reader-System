module.exports.isUserIdExist = async function(userId) {
    try {
        let user = await User.findOne({
            where: {
                id: userId
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