const { User, Discount, Coupon } = require("../models");

const userDiscountController = {
  getUserCoupons: async (req, res, next) => {
    try {
      const { account } = req.params;

      const user = await User.findOne({
        where: { account },
        nest: true,
        include: [
          {
            model: Discount,
            where: { isApplied: false },
            include: [Coupon],
          },
        ],
      });

      console.log();

      if (!user || !user?.Discounts)
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });

      return res.status(200).json({
        success: true,
        data: user.Discounts,
      });
    } catch (error) {
      next(error);
    }
  },
  checkedDiscountValidation: async (req, res, next) => {
    try {
      const { account } = req.params;
      const { code } = req.body;

      const [user, coupon] = await Promise.all([
        User.findOne({
          where: { account },
        }),
        Coupon.findOne({
          where: {
            code,
          },
        }),
      ]);

      if (!user || !coupon)
        return res.status(200).json({
          success: true,
          data: {
            status: false,
            coupon: null,
          },
        });

      const discount = await Discount.findOne({
        where: {
          couponId: coupon.id,
          userId: user.id,
        },
      });

      if (!discount || discount.isApplied)
        return res.status(200).json({
          success: true,
          data: {
            status: false,
            coupon: null,
          },
        });

      const couponJSON = coupon.toJSON();

      const data = {
        discountId: discount.id,
        code: couponJSON.code,
        discountType: couponJSON.discountType,
        discountValue: couponJSON.discountValue,
      };

      return res.status(200).json({
        success: true,
        data: {
          status: true,
          coupon: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = userDiscountController;
