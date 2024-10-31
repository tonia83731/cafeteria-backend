const { User } = require("../models");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {
  resSuccessHelpers,
  resErrorHelpers,
} = require("../helpers/res-helpers");
const authController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name || !email || !password || !confirmPassword)
        return resErrorHelpers(
          res,
          {
            success: false,
            message: "Input cannot be blank.",
          },
          400
        );

      if (name.length > 50 || name.length < 3)
        return resErrorHelpers(
          res,
          {
            success: false,
            message: "Name need to between 3-50 letters",
          },
          400
        );

      if (validator.isEmail(email))
        return resErrorHelpers(
          res,
          {
            success: false,
            message: "Invalid email.",
          },
          400
        );

      if (validator.equals(password, confirmPassword))
        return resErrorHelpers(
          res,
          {
            success: false,
            message: "Password and confirmPassword are not the same.",
          },
          400
        );
      // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
      if (
        validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return resErrorHelpers(
          res,
          {
            success: false,
            message:
              "Required strong password (above 8 letters, 1 lowercase, 1 uppercase, 1 number and 1 symbol)",
          },
          400
        );
      }
      const hash = await bcrypt.hash(password, 10);
      let user = await User.create({
        name,
        email,
        password: hash,
      });

      user = user.toJSON();
      delete user.password;
      resSuccessHelpers(res, user, 201);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const token = jwt.sign(req.user, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
    } catch (error) {
      console.log(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const token = jwt.sign(req.user, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authController;
