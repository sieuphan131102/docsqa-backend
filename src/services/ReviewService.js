const Document = require("../models/DocumentModel");
const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const { default: mongoose } = require("mongoose");

const postReview = (newReview) => {
  const { document, user, rating, comment } = newReview;
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(user);
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "The user account not found",
        });
      }
      const checkDocument = await Document.findById(document);
      if (checkDocument === null) {
        resolve({
          status: "ERROR",
          message: "The document not found",
        });
      }

      const createdReview = new Review({
        document,
        user,
        rating,
        comment,
      });

      await createdReview.save();
      checkDocument.reviews.push(createdReview._id);
      checkUser.reviews.push(createdReview._id);

      await checkDocument.save();
      await checkUser.save();

      resolve({
        status: "OK",
        message: "Create review success",
        data: createdReview,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdReview = await Review.find();
      if (createdReview) {
        resolve({
          status: "OK",
          message: "Get all review success",
          data: createdReview,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getReviewWithId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const reviews = await Review.find({
        document: objectId,
      }).populate("user");

      resolve({
        status: "OK",
        message: "Get all review success",
        data: reviews,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postReview,
  getAllReview,
  getReviewWithId,
};
