const express = require('express');
const router = express.Router();
const Utility = require('../helpers/utility');
const UserService = require('../services/users.service');
const { addUser } = require('../validation');

/**
 * @swagger
 * /users/:
 *   get:
 *     description: Test route.
 *     responses:
 *       200:
 *         description: Returns a hello string.
 */
router.post('/', addUser, async (req, res) => {
  try {
    const result = await UserService.addUser(req.body.name);
    if (result.error) {
      return Utility.render(res, { success: false, msg: result.error });
    }
    return Utility.render(res, result);
  } catch (error) {
    return Utility.render(res, { success: false, msg: error });
  }
});
module.exports = router;
