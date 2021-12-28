var express = require("express");
const bcrypt = require("bcrypt");
const SellerModel = require("../models/SellerModel");
const jwt = require("jsonwebtoken");
const logger = require("pino")();

exports.addSeller = async (req, res) => {
  try {
    const Seller = await SellerModel.findOne({
      sellerEmail: req.body.sellerEmail,
    });
    if (Seller) {
      return res.send({
        error: true,
        message: "Seller with this email is already exist",
      });
    }
    const newSeller = new SellerModel(req.body);
    const salt = await bcrypt.genSalt(10);

    if (!newSeller.sellerPassword) {
      return res.send({
        error: true,
        message: "Password can't be blank",
      });
    }

    newSeller.sellerPassword = await bcrypt.hash(req.body.sellerPassword, salt);
    logger.info("newSeller.password--->", newSeller.sellerPassword);
    newSeller.createdAt = Date.now();
    newSeller.save();

    return res.send({
      error: false,
      result: newSeller,
      message: "Seller Successfully Registered",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.loginSeller = async (req, res) => {
  try {
    const Seller = await SellerModel.findOne({
      sellerEmail: req.body.sellerEmail,
    });
    if (!Seller) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }

    logger.info(req.body.sellerEmail);
    logger.info(req.body.sellerPassword);
    logger.info(Seller.sellerPassword);
    const validate = await bcrypt.compare(
      req.body.sellerPassword,
      Seller.sellerPassword
    );
    logger.info(validate);

    if (!validate) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }
    const payload = {
      id: Seller._id,
      role: Seller.role
    };
    jwt.sign(
      payload,
      process.env.jwtPrivateKey,
      { expiresIn: parseInt(process.env.jwtExpiryIn) },
      async (err, token) => {
        if (err) {
          return res.send({
            status: 501,
            error: true,
            message: "Server Error",
          });
        }
        return res.send({
          error: false,
          result: Seller,
          token: token,
          message: "Seller logedin",
        });
      }
    );
  } catch (err) {
    logger.info(`Error while finding user--${err}`);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const existingSeller = await SellerModel.findById(req.user._id);
    if (!existingSeller) {
      return res.send({
        error: true,
        result: {},
        message: "Seller not found",
      });
    }
    existingSeller.sellerName =
      req.body.sellerName || existingSeller.sellerName;
    existingSeller.sellerPhNumber =
      req.body.sellerPhNumber || existingSeller.sellerPhNumber;
    existingSeller.sellerGender =
      req.body.sellerGender || existingSeller.sellerGender;
    existingSeller.sellerAddress =
      req.body.sellerAddress || existingSeller.sellerAddress;
    existingSeller.updateAt = Date.now();
    existingSeller.save();
    return res.send({
      error: false,
      result: existingSeller,
      message: "Seller successfully updated",
    });
  } catch (error) {
    logger.info(error.message);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const existingSeller = await SellerModel.findById(req.user._id);
    if (!existingSeller) {
      return res.send({
        error: true,
        result: {},
        message: "Seller not found",
      });
    }

    const validate = await bcrypt.compare(
      req.body.password,
      existingSeller.sellerPassword
    );
    if (!validate) {
      return res.send({
        error: true,
        message: "Password didn't match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    existingSeller.sellerPassword = await bcrypt.hash(
      req.body.newPassword,
      salt
    );
    const updatedUser = await existingSeller.save();
    return res.send({
      error: false,
      result: updatedUser,
      message: "Password successfully updated",
    });
  } catch (error) {
    logger.info(error.message);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const existingSeller = await SellerModel.find({
      sellerEmail: req.body.email,
    });
    if (!existingSeller) {
      return res.send({
        error: true,
        result: {},
        message: "Seller not found",
      });
    }

    const validate = await bcrypt.compare(
      req.body.password,
      existingSeller.sellerPassword
    );
    if (!validate) {
      return res.send({
        error: true,
        message: "Password didn't match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    existingSeller.sellerPassword = await bcrypt.hash(
      req.body.newPassword,
      salt
    );
    const updatedUser = await existingSeller.save();
    return res.send({
      error: false,
      result: updatedUser,
      message: "Password successfully updated",
    });
  } catch (error) {
    logger.info(error.message);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const allSeller = await SellerModel.find({});
    return res.send({
      error: false,
      result: allSeller,
      message: "Sellers successfully found",
    });
  } catch (error) {
    logger.info(error.message);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};
