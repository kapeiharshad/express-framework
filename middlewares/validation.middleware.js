const { validationResult } = require('express-validator');
module.exports = function (modes) {
  return async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msgString = `${errors.array()[0].msg} of '${
        errors.array()[0].param
      }' at ${errors.array()[0].location} location.`;
      return res
        .status(400)
        .json({ success: false, msg: msgString, errors: errors.array() });
    } else {
      next();
    }
  };
};
