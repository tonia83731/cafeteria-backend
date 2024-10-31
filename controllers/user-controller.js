const { User } = require("../models");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {
  resSuccessHelpers,
  resErrorHelpers,
} = require("../helpers/res-helpers");
const userController = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const response = await User.findByPk(userId);
      if (!response)
        return resErrorHelpers(
          res,
          {
            success: false,
            message: "User no found.",
          },
          404
        );

      const user = response.toJSON();
      delete user.password;
      resSuccessHelpers(res, user, 201);
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
