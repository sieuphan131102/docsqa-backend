const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const Review = require("../models/ReviewModel");
const Document = require("../models/DocumentModel");

const createUser = (newUser) => {
  const { userName, password, fullName, email, address, avatar } = newUser;
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        userName: userName,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERROR",
          message: "The user account already existed",
        });
      }
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        userName,
        email,
        fullName,
        password: hash,
        address,
        avatar,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Create user success",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  const { userName, password } = userLogin;
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        userName: userName,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "The user account not exist",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERROR",
          message: "The user or password is invalid",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "Login success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update user success",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      const userReviews = await Review.find({ user: id });

      await Review.deleteMany({ user: id });

      await Document.updateOne(
        { reviews: { $in: userReviews.map((review) => review._id) } },
        { $pull: { reviews: { $in: userReviews.map((review) => review._id) } } }
      );

      await User.deleteOne({ _id: id });

      resolve({
        status: "OK",
        message: "Delete user SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "Get all user SUCCESS",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user account not exist",
        });
      }
      resolve({
        status: "OK",
        message: "Get one user SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAll,
  getUser,
};
