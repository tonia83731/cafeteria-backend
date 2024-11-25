const { User, Product, Discount, Coupon } = require("../../models");

const discountController = {
  getDiscounts: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const discounts = await Discount.findAll({
        where: { userId },
        include: [Coupon],
      });
      return res.status(200).json({
        success: true,
        data: discounts,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDiscount: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { discountId } = req.params;
      const discount = await Discount.findOne({
        where: {
          userId,
          id: discountId,
        },
        include: [Coupon],
      });
      if (!discount)
        return res.status(404).json({
          success: false,
          message: "Discount no found.",
        });
      return res.status(200).json({
        success: true,
        discount,
      });
    } catch (error) {
      console.log(error);
    }
  },
  applyDiscount: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { code } = req.body;
      const coupon = await Coupon.findOne({
        where: { code },
      });

      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon not found.",
        });

      const discount = await Discount.findOne({
        where: { userId, couponId: coupon.id },
      });

      if (discount.isApplied)
        return res.status(400).json({
          success: false,
          message: "Discount has already been used.",
        });

      const update_discount = await discount.update({
        isApplied: true,
      });

      return res.status(200).json({
        success: true,
        data: {
          discount: update_discount,
          coupon,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = discountController;
