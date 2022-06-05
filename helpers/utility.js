class Utility {
  static render(res, result) {
    if (!result.success) {
      if (result.statusCode) {
        res.status(result.statusCode);
        delete result.statusCode;
      } else res.status(400);
    } else {
      if (result.statusCode) {
        res.status(result.statusCode);
        delete result.statusCode;
      } else res.status(200);
    }

    res.json(result);
  }
}
module.exports = Utility;
