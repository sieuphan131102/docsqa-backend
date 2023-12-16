const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const { authToken, authUserToken } = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", authToken, userController.deleteUser);
router.get("/all", authToken, userController.getAll);
router.get("/get/:id", authUserToken, userController.getUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
