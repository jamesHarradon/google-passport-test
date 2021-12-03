const UserModel = require('../Models/user-auth-model');
const createError = require('http-errors');


const UserModelInstance = new UserModel();

class AuthService {
    async register(data) {
        
        try {
            //check if user already exists
            const user = await UserModelInstance.findOneById(data.id);
            if (user) {
                return user;
            }
            //if user doesnt exist
            const newUser = await UserModelInstance.createUser(data);
            return newUser;
            
        } catch (err) {
            throw createError(500, err)
        }
    }
}

module.exports = AuthService;