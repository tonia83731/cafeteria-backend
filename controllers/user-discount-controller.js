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

      const user = await User.findOne({
        where: { account },
        include: [
          {
            model: Discount,
            where: { isApplied: false },
            include: [
              {
                model: Coupon,
                where: {
                  code,
                },
              },
            ],
          },
        ],
      });

      if (!user)
        return res.status(200).json({
          success: true,
          data: false,
        });

      return res.status(200).json({
        success: true,
        data: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = userDiscountController;
