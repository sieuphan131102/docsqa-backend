const Document = require("../models/DocumentModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");

const createDocument = (newDoc) => {
  const { title, author, image, type, description, data, down } = newDoc;
  return new Promise(async (resolve, reject) => {
    try {
      const checkDoc = await Document.findOne({
        title: title,
      });
      if (checkDoc !== null) {
        resolve({
          status: "ERROR",
          message: "The document already existed",
        });
      }
      const createdDoc = await Document.create({
        title,
        author,
        image,
        type,
        description,
        data,
        down,
      });
      if (createdDoc) {
        resolve({
          status: "OK",
          message: "Create document SUCCESS",
          data: createdDoc,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateDocument = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedDoc = await Document.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updatedDoc) {
        resolve({
          status: "OK",
          message: "Update document SUCCESS",
          data: updatedDoc,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteDocument = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const documentReviews = await Review.find({ document: id });

      await Review.deleteMany({ document: id });

      await User.updateMany(
        { reviews: { $in: documentReviews.map((review) => review._id) } },
        {
          $pull: {
            reviews: { $in: documentReviews.map((review) => review._id) },
          },
        }
      );

      await Document.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete document SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (page = 1, limit, type, title, sortBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = {};
      if (type) {
        query.type = type;
      }
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      const sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = 1;
      }

      const startIndex = (page - 1) * limit;

      const allDocs = await Document.find(query)
        .sort(sortOptions)
        .limit(Number(limit))
        .skip(startIndex);

      const totalDocs = await Document.countDocuments(query);

      resolve({
        status: "OK",
        message: "Get documents SUCCESS",
        currentPage: page,
        total: totalDocs,
        data: allDocs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOneDocument = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await Document.findOne({
        _id: id,
      });
      if (doc === null) {
        resolve({
          status: "ERROR",
          message: "The document is not exist",
        });
      }
      resolve({
        status: "OK",
        message: "Get all documents SUCCESS",
        data: doc,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDocument,
  updateDocument,
  deleteDocument,
  getAll,
  getOneDocument,
};
