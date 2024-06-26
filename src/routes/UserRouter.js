const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const { authToken, authUserToken } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put(
  "/update/:id",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userController.updateUser
);
router.delete("/delete/:id", authToken, userController.deleteUser);
router.get("/all", authToken, userController.getAll);
router.get("/get/:id", userController.getUser);
router.post("/refresh-token", userController.refreshToken);

router.post("/payment/:userId", userController.payment);
router.get("/payment/get/:userId", userController.getPayments);
router.post("/history/:userId", userController.history);
router.get("/history/get/:userId", userController.getHistory);

module.exports = router;
