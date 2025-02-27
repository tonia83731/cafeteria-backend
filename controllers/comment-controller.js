const { Comment } = require("../models");
const validator = require("validator");

const commentController = {
  getTop5Comments: async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        limit: 5,
        order: [["createdAt", "DESC"]],
        raw: true,
      });

      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const { name, email, rate, comment } = req.body;
      if (!name)
        return res.status(400).json({
          success: false,
          message: "Name cannot be blank.",
        });
      if (!email)
        return res.status(400).json({
          success: false,
          message: "Email cannot be blank.",
        });
      if (!validator.isEmail(email))
        return res.status(400).json({
          success: false,
          message: "Invalid email.",
        });
      if (!rate)
        return res.status(400).json({
          success: false,
          message: "Rate cannot be blank.",
        });
      if (rate < 0.0 || rate > 5.0)
        return res.status(400).json({
          success: false,
          message: "Rate should between 0.0-5.0.",
        });
      if (comment && comment.length > 500)
        return res.status(400).json({
          success: false,
          message: "Comment cannot exceed 500 words.",
        });
      await Comment.create({
        name,
        email,
        rate,
        comment,
      });
      return res.status(201).json({
        success: true,
        message: "Comment created!",
        // data: new_comment,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentController;
