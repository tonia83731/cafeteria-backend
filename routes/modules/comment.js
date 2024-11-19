const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/comment-controller");

router.post("/", commentController.addComment);
router.get("/top5", commentController.getTop5Comments);

module.exports = router;
