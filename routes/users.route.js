const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users/:
 *   get:
 *     description: Test route.
 *     responses:
 *       200:
 *         description: Returns a hello string.
 */
router.get('/', (req, res) => {
  try {
    res.send('hello');
  } catch (error) {
    return error;
  }
});
module.exports = router;
