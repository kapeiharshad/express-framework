const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');

/**
 * @swagger
 * /users/:
 *   get:
 *     description: Test route.
 *     responses:
 *       200:
 *         description: Returns a hello string.
 */
router.post('/', async (req, res) => {
  try {
    const result = await UserService.addUser(req.body.name);
    res.send(result);
  } catch (error) {
    return error;
  }
});
module.exports = router;
