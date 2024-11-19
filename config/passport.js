const passport = require("passport");
// const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");

// const bcrypt = require("bcryptjs");
const { User, Language } = require("../models");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: false,
//     },
//     async (email, password, cb) => {
//       const user = await User.findOne({
//         where: { email },
//       });

//       if (!user)
//         return cb(null, false, { message: "Wrong email or password." });
//       const isSamePassword = await bcrypt.compare(password, user.password);
//       if (!isSamePassword)
//         return cb(null, false, { message: "Wrong email or password." });
//       return cb(null, user);
//     }
//   )
// );

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtpayload, cb) => {
    try {
      const user = await User.findByPk(jwtpayload.id);
      if (!user) return cb(null, false);
      cb(null, user.toJSON());
    } catch (error) {
      cb(error);
    }
  })
);

// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });
// passport.deserializeUser(async (id, cb) => {
//   let user = await User.findByPk(id);
//   // console.log(user);
//   user = user.toJSON();
//   return cb(null, user);
// });

module.exports = passport;
