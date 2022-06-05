const User = require('../models/users.model');
const logger = require('../helpers/logger');
class UserService {
  static async addUser(name) {
    try {
      const userData = await User.create({ name: name });
      if (userData && userData.id) {
        return {
          success: true,
          statusCode: 200,
          msg: 'User added successfully.',
          id: userData.id,
        };
      } else {
        return {
          success: false,
          statusCode: 400,
          msg: 'User added unsuccessfully.',
        };
      }
    } catch (error) {
      logger.error('From Add user error', { errorMsg: error });
      return {
        success: false,
        statusCode: 500,
        msg: 'An error occurs',
      };
    }
  }
}
module.exports = UserService;
