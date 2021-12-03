const createError = require('http-errors');
const UserModel = require('../Models/user-auth-model');

const UserModelInstance = new UserModel();

class UserService {
    async get(id) {
        
        try {
            //check if user already exists
            const user = await UserModelInstance.findOneById(id);
            if (user) {
                return user;
            };
            return null;
            
        } catch (err) {
            throw createError(500, err)
        }
    }
}

module.exports = UserService;