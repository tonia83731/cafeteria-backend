const { User, Card } = require("../models");
const {
  creditCartType,
  ecryptCardNumber,
  decryptCardNumber,
  hideCardNumber,
} = require("../helpers/card-helpers");
const validator = require("validator");

const userController = {
  getUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      let userData = user.toJSON();

      delete userData.password;

      return res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, password, phone, address } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      const update_fields = {};
      if (name !== undefined) {
        if (name.length > 50 || name.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Name must between 3-50 letters.",
          });
        }
        update_fields.name = name;
      }

      if (password !== undefined) {
        if (
          validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Required strong password (above 8 letters, 1 lowercase, 1 uppercase, 1 number and 1 symbol)",
          });
        }
        const hash = await bcrypt.hash(password, 10);
        update_fields.password = hash;
      }

      if (phone !== undefined) update_fields.phone = phone;
      if (address !== undefined) update_fields.address = address;

      const edit_user = await user.update(update_fields);
      // delete edit_user.password;
      return res.status(200).json({
        success: false,
        message: "User updated successfully.",
        data: edit_user,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  updateInvoice: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { invoice } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      await user.update({ invoice });
      return res
        .status(200)
        .json({ success: true, message: "User invoice updated." });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  updateLanguagePerference: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { language } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      const validLanguages = ["zh", "en"];
      if (!validLanguages.includes(language))
        return res.status(404).json({
          success: false,
          message: "Language invalid. Supported languages are 'zh' and 'en'.",
        });

      if (language === user.language)
        return res.status(200).json({
          success: true,
          message: "Language is already updated.",
        });
      await user.update({ language });
      return res
        .status(200)
        .json({ success: true, message: "Language perferences updated." });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  getCards: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cards = await Card.findAll({
        raw: true,
        where: { userId },
      });

      const cardDatas = cards.map((card) => {
        const decryptCard = decryptCardNumber(card.cardNumber);
        const partCard = hideCardNumber(decryptCard);
        return {
          ...card,
          cardNumber: partCard,
        };
      });

      return res.status(200).json({
        success: true,
        data: cardDatas,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  getCard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { cardId } = req.params;

      const card = await Card.findOne({
        raw: true,
        where: {
          id: cardId,
          userId,
        },
      });

      if (!card)
        return res.status(404).json({
          success: false,
          message: "Card no found",
        });

      const decryptCard = decryptCardNumber(card.cardNumber);

      card.cardNumber = decryptCard;

      return res.status(200).json({
        success: true,
        data: card,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  addCard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { cardNumber, expirationDate } = req.body;
      const cardType = creditCartType(cardNumber);
      const ecryptCard = ecryptCardNumber(cardNumber);
      const new_card = await Card.create({
        userId,
        cardNumber: ecryptCard,
        cardType,
        expirationDate,
      });

      return res.status(201).json({
        success: true,
        message: "Credit card added.",
        data: new_card,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
};
module.exports = userController;
