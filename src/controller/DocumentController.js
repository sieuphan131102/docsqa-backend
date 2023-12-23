const Document = require("../models/DocumentModel");
const DocumentService = require("../services/DocumentService");
const fs = require("fs");

const createDocument = async (req, res) => {
  try {
    const { title, author, type, description } = req.body;
    const image = req.files["image"][0].filename;
    const data = req.files["data"][0].filename;
    if (!title || !author || !image || !type || !description || !data) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await DocumentService.createDocument({
      ...req.body,
      image,
      data,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Error: " + e,
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const docId = req.params.id;
    let data = req.body;

    if (!docId) {
      return res.status(200).json({
        status: "ERR",
        message: "The docId is required",
      });
    }

    const checkDoc = await Document.findOne({
      _id: docId,
    });

    if (checkDoc === null) {
      resolve({
        status: "ERROR",
        message: "The document is not existed",
      });
    }

    if (req.files["image"]) {
      if (checkDoc.image) {
        fs.unlinkSync(`uploads/${checkDoc.image}`);
      }
      const image = req.files["image"][0].filename;
      data = { ...data, image };
    }
    if (req.files["data"]) {
      if (checkDoc.data) {
        fs.unlinkSync(`uploads/${checkDoc.data}`);
      }
      const dataPdf = req.files["data"][0].filename;
      data = { ...data, data: dataPdf };
    }

    const response = await DocumentService.updateDocument(docId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Error: " + e,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const docId = req.params.id;
    if (!docId) {
      return res.status(200).json({
        status: "ERR",
        message: "The docId is required",
      });
    }

    const checkDoc = await Document.findOne({
      _id: docId,
    });
    if (checkDoc === null) {
      resolve({
        status: "ERROR",
        message: "The document is not existed",
      });
    }

    if (checkDoc.image) {
      fs.unlinkSync(`uploads/${checkDoc.image}`);
    }
    if (checkDoc.data) {
      fs.unlinkSync(`uploads/${checkDoc.data}`);
    }

    const response = await DocumentService.deleteDocument(docId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Error: " + e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { page, limit, type, title, sortBy } = req.query;
    const response = await DocumentService.getAll(
      page,
      limit,
      type,
      title,
      sortBy
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Error: " + e,
    });
  }
};

const getOneDocument = async (req, res) => {
  try {
    const docId = req.params.id;
    if (!docId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The docId is required",
      });
    }
    const response = await DocumentService.getOneDocument(docId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Error: " + e,
    });
  }
};

module.exports = {
  createDocument,
  updateDocument,
  deleteDocument,
  getAll,
  getOneDocument,
};
