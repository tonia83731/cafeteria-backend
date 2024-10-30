const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { resSuccessHelpers } = require("../helpers/res-helpers");
const userController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      const hash = await bcrypt.hash(password, 10);
      let user = await User.create({
        name,
        email,
        password: hash,
      });

      user = user.toJSON();
      resSuccessHelpers(res, user, 201);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
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
  // only user admin can do this action
  addUserAdmin: async (req, res, next) => {
    try {
      const { userId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  removeUserAdmin: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
