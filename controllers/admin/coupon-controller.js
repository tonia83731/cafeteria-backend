const { User, Coupon, UserCoupon } = require("../../models");
const {Coupon_Discount_Type} = require("../../helpers/opts-helper")

const valdiateCouponInput = (body) => {
  const {
    code,
    description,
    descriptionEn,
    discountType,
    discountValue,
    expiryDate
  } = body;

  if (!code || code.length < 6 || code.length > 18) {
    return { valid: false, msg: 'Code should be between 6-18 letters' };
  }

  if (!discountType || !discountValue) {
    return { valid: false, msg: 'Discount type and Discount value is required' };
  }
  if (discountType === Coupon_Discount_Type.fixed && discountValue < 1) {
    return { valid: false, msg: 'Fixed discount value must be greater than 1 (e.g., 10 for $10 off).' };
  }
  if (discountType === Coupon_Discount_Type.percent && (discountValue <= 0 || discountValue >= 1)) {
    return { valid: false, msg: 'Percent discount must be a decimal between 0 and 1 (e.g., 0.5 for 50% off).' };
  }

  if (description && description.length > 300) {
    return { valid: false, msg: 'Description cannot exceed 300 characters.' };
  }
  if (descriptionEn && descriptionEn.length > 300) {
    return { valid: false, msg: 'English description cannot exceed 300 characters.' };
  }

  if (expiryDate) {
    const now = Date.now();
    const after_three_days = now + 3 * 24 * 60 * 60 * 1000;
    const expiry_timestamp = new Date(expiryDate).getTime();

    if (expiry_timestamp < after_three_days) {
      return { valid: false, msg: 'Expiry date must be at least 3 days from today.' };
    }
  }

  return { valid: true, msg: null };
}


const adminCouponController = {
  createdCoupon: async (req, res, next) => {
    try {
      const {
        code,
        description,
        descriptionEn,
        discountType,
        discountValue,
        expiryDate
      } = req.body;

      const {valid, msg} = valdiateCouponInput(req.body)
      if (!valid) {
        return res.status(400).json({
          success: false,
          message: msg
        })
      }

      let newCoupon = await Coupon.create({
        code,
        description,
        descriptionEn,
        discountType,
        discountValue,
        expiryDate: expiryDate || null
      });

      return res.status(201).json({
        success: true,
        data: newCoupon,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const {
        code,
        description,
        descriptionEn,
        discountType,
        discountValue,
        expiryDate
      } = req.body;

      const coupon = await Coupon.findByPk(couponId);
      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon no found.",
        });

      if (coupon.isActive)
        return res.status(400).json({
          success: false,
          message: "Coupon cannot edit after published",
        });


      const {valid, msg} = valdiateCouponInput(req.body)
      if (!valid) {
        return res.status(400).json({
          success: false,
          message: msg
        })
      }

      const update_coupon = await coupon.update({
        code,
        description,
        descriptionEn,
        discountType,
        discountValue,
        expiryDate,
        isActive: false,
      });
      return res.status(200).json({
        success: true,
        data: update_coupon,
      });
    } catch (error) {
      next(error);
    }
  },
  publishedCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId);
      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon not found.",
        });
      if (coupon.isActive)
        return res.status(200).json({
          success: true,
          message: "Coupon alreay published.",
        });

      const users = await User.findAll({
        where: { isAdmin: false },
      });

      await coupon.update({
        isActive: true,
      });
      const createdUserCoupon = users.map((user) => ({
        userId: user.id,
        couponId: coupon.id,
        isUsed: false,
      }));

      await UserCoupon.bulkCreate(createdUserCoupon)

      return res.status(200).json({
        success: true,
        message: "Coupon is published. Add coupons to discounts.",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId);

      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon no found.",
        });

      await coupon.destroy();

      return res.status(200).json({
        success: true,
        message: "Coupon and relative discounts are deleted",
      });
    } catch (error) {
      next(error);
    }
  },
  getCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.findAll({
        raw: true,
        order: [
          ["isPublished", "DESC"],
          ["endDate", "ASC"],
        ],
      });
      return res.status(200).json({
        success: true,
        data: coupons,
      });
    } catch (error) {
      next(error);
    }
  },
  getCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId, {
        raw: true,
      });
      if (!coupon)
        return res.status(404).json({
          success: false,
          messge: "Coupon does not exist.",
        });

      return res.status(200).json({
        success: true,
        data: coupon,
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = adminCouponController;
