const { User, Product, Discount, Coupon } = require("../../models");

const discountController = {
  getDiscounts: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;
      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }
      const discounts = await Discount.findAll({
        where: { userId, isApplied: false },
        include: [Coupon],
      });

      // Transform the data
      const discounts_data = discounts.map((discount) => {
        const discountData = discount.toJSON();
        const {
          code,
          title,
          description,
          discountType,
          discountValue,
          startDate,
          endDate,
          isPublished,
        } = discountData.Coupon || {};

        return {
          ...discountData,
          code,
          title,
          description,
          discountType,
          discountValue,
          startDate,
          endDate,
          isPublished,
          Coupon: undefined,
        };
      });

      return res.status(200).json({
        success: true,
        data: discounts_data,
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
