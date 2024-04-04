module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((e) => {
    if (!e.statusCode) {
      e.statusCode = 401;
    }
    res
      .status(e.statusCode)
      .json({ success: false, message: e.message, data: {} });
    return next;
  });
};
