const User = require('../models/users.model');
class UserService {
  static async addUser(name) {
    const userData = await User.create({ name: name });
    return userData;
  }
}
module.exports = UserService;
