const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const User = require("../models/UserModel");
const fs = require("fs");

const createUser = async (req, res) => {
  try {
    const { userName, password, confirmPassword } = req.body;
    if (!userName || !password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is not equal confirm password",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const response = await UserService.loginUser(req.body);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    let data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "OK",
        message: "The userId is required",
      });
    }

    const checkUser = await User.findOne({
      _id: userId,
    });
    if (checkUser === null) {
      resolve({
        status: "ERROR",
        message: "The user is not existed",
      });
    }

    if (req.files["avatar"]) {
      if (checkUser.avatar) {
        fs.unlinkSync(`uploads/avatar/${checkUser.avatar}`);
      }
      const avatar = req.files["avatar"][0].filename;
      data = { ...data, avatar };
    }

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "Err: " + e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "OK",
        message: "The userId is required",
      });
    }

    const checkUser = await User.findOne({
      _id: userId,
    });
    if (checkUser === null) {
      return res.status(200).json({
        status: "ERROR",
        message: "The user is not existed",
      });
    }

    if (checkUser.avatar) {
      fs.unlinkSync(`uploads/avatar/${checkUser.avatar}`);
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "OK",
        message: "The userId is required",
      });
    }
    const response = await UserService.getUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshToken(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAll,
  getUser,
  refreshToken,
};
