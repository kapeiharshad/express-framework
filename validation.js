const { check } = require('express-validator');
const checkValidation = require('./middlewares/validation.middleware');

exports.addUser = [
  check('name', 'Name is invalid').isString().isLength({ min: 1, max: 100 }),
  checkValidation(),
];
