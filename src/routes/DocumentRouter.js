const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/authMiddleware");
const DocumentController = require("../controller/DocumentController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "data", maxCount: 1 },
  ]),
  DocumentController.createDocument
);
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "data", maxCount: 1 },
  ]),
  DocumentController.updateDocument
);
router.delete("/delete/:id", authToken, DocumentController.deleteDocument);
router.get("/all", DocumentController.getAll);
router.get("/get/:id", DocumentController.getOneDocument);

module.exports = router;
