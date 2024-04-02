const Category = require("../models/Category");

const create = async (req, res) => {
  try {
    const { name, des } = req.body;
    if (!name) {
      return res.status(500).json({ message: "The name field is required!" });
    }
    const createdCategory = await Category.create({
      name,
      des,
    });
    if (createdCategory) {
      res.status(201).json(createdCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      res.status(500).json({ message: "The id is required!" });
    }
    const checkCate = await Category.findOne({
      _id: id,
    });
    if (!checkCate) {
      res.status(500).json({ message: "The category not found" });
    }

    const updated = await Category.findByIdAndUpdate(id, data, { new: true });
    if (updated) {
      res.status(200).json(updated);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteCate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      res.status(500).json({ message: "The id is required!" });
    }
    const checkCate = await Category.findOne({
      _id: id,
    });
    if (!checkCate) {
      res.status(500).json({ message: "The category not found" });
    }
    await Category.deleteOne({ _id: id });
    res.status(200).json("Delete successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const allCate = await Category.find();
    if (allCate) {
      res.status(200).json(allCate);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  create,
  update,
  deleteCate,
  getAll,
};
