const express = require("express");
const router = express.Router();
const categoryController = require("../controller/CategoryController");

router.post("/create", categoryController.create);
router.put("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.deleteCate);
router.get("/all", categoryController.getAll);

module.exports = router;
