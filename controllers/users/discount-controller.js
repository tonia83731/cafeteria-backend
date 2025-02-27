const { User, Product, Discount, Coupon } = require("../../models");

const discountController = {
  checkedDiscount: async (req, res, next) => {
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

      if (discount.isApplied) {
        return res.status(200).json({
          success: true,
          available: false,
          message: "Discount has already been used.",
        });
      }

      return res.status(200).json({
        success: true,
        available: true,
        data: discount,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = discountController;
