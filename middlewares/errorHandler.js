module.exports = (req, res, next, error) => {
  return res
      .status(err.status || 500)
      .json({
          message: 'Server error',
          stack: `${err.message || err}`
      });
};