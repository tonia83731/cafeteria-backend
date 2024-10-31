const { Product, Category } = require("../../models");

const adminProductController = {
  getProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = adminProductController;
