const DocumentService = require("../services/DocumentService");

const createDocument = async (req, res) => {
  try {
    const { title, author, image, type, rating, description } = req.body;
    if (!title || !author || !image || !type || !rating) {
      res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await DocumentService.createDocument(req.body);
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
    const data = req.body;
    if (!docId) {
      res.status(200).json({
        status: "ERR",
        message: "The docId is required",
      });
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
      res.status(200).json({
        status: "ERR",
        message: "The docId is required",
      });
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
      res.status(200).json({
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
