const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/authMiddleware");
const DocumentController = require("../controller/DocumentController");

router.post("/create", DocumentController.createDocument);
router.put("/update/:id", DocumentController.updateDocument);
router.delete("/delete/:id", authToken, DocumentController.deleteDocument);
router.get("/all", DocumentController.getAll);
router.get("/get/:id", DocumentController.getOneDocument);

module.exports = router;
