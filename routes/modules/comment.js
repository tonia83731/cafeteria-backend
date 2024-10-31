const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/comment-controller");

router.get("/top5", commentController.getTop5Comments);
router.post("/", commentController.addComment);

module.exports = router;
