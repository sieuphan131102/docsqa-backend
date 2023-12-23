const express = require("express");
const router = express.Router();
const ReviewController = require("../controller/ReviewController");

router.post("/post-review", ReviewController.postReview);
router.get("/all", ReviewController.getAllReview);
router.get("/get/:id", ReviewController.getReviewWithId);

module.exports = router;
