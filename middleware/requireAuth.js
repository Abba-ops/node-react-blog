const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/");
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded.user;
  next();
};

module.exports = { requireAuth };
