const passport = require("../config/passport");
const { getUser } = require("../helpers/_helpers");

const authenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user)
      return res.status(401).json({ success: false, message: "unauthorized" });
    req.user = user;
    // console.log(user);
    next();
  })(req, res, next);
};
const authenticatedUser = (req, res, next) => {
  const user = getUser(req);
  // console.log(user);
  if (user && !user.isAdmin) return next();
  return res.status(403).json({
    success: false,
    message: "permission denied",
  });
};
const authenticatedAdmin = (req, res, next) => {
  const user = getUser(req);
  if (user && user.isAdmin) return next();
  return res.status(403).json({
    success: false,
    message: "permission denied",
  });
};

module.exports = {
  authenticated,
  authenticatedUser,
  authenticatedAdmin,
};
