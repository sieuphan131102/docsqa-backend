const ReviewService = require("../services/ReviewService");

const postReview = async (req, res) => {
  try {
    const { document, user, rating, comment } = req.body;
    if (!comment) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!document || !user) {
      return res.status(200).json({
        status: "ERROR",
        message: "The document or user is required",
      });
    }
    const response = await ReviewService.postReview(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllReview = async (req, res) => {
  try {
    const response = await ReviewService.getAllReview();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getReviewWithId = async (req, res) => {
  try {
    const docId = req.params.id;
    if (!docId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The docId is required",
      });
    }
    const response = await ReviewService.getReviewWithId(docId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "Error" + e,
    });
  }
};

module.exports = {
  postReview,
  getAllReview,
  getReviewWithId,
};
