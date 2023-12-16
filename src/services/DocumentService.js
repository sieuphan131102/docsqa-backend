const Document = require("../models/DocumentModel");

const createDocument = (newDoc) => {
  const { title, author, image, type, rating, description } = newDoc;
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
        rating,
        description,
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
      const checkDoc = await Document.findOne({
        _id: id,
      });
      if (checkDoc === null) {
        resolve({
          status: "ERROR",
          message: "The document is not existed",
        });
      }
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
      const checkDoc = await Document.findOne({
        _id: id,
      });
      if (checkDoc === null) {
        resolve({
          status: "ERROR",
          message: "The document is not existed",
        });
      }
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

const getAll = (page = 1, limit = 10, type, title, sortBy) => {
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
        totalPages: Math.ceil(totalDocs / limit),
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
