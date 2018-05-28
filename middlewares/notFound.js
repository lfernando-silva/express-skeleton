module.exports = (req,res) => {
  return res
      .status(404)
      .json({
          notFound: true,
          message: `Resource ${req.method}${req.originalUrl} not found.`
      });
};