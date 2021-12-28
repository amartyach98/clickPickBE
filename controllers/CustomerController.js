var express = require("express");
const bcrypt = require("bcrypt");
const CustomerModel = require("../models/CustomerModel");
const jwt = require("jsonwebtoken");
const logger = require("pino")();

exports.addCustomer = async (req, res) => {
  try {
      console.log(req.body)
    const existingCustomer = await CustomerModel.findOne({
      customerEmail: req.body.customerEmail,
    });
    if (existingCustomer) {
      return res.send({
        error: true,
        message: "User with this email is already exist",
      });
    }
    const newCustomer = new CustomerModel(req.body);
    const salt = await bcrypt.genSalt(10);

    if (!newCustomer.customerPassword) {
      return res.send({
        error: true,
        message: "Password can't be blank",
      });
    }

    newCustomer.customerPassword = await bcrypt.hash(req.body.customerPassword, salt);
    logger.info("newSeller.password--->", newCustomer.customerPassword);
    newCustomer.createdAt = Date.now();
    newCustomer.save();

    return res.send({
      error: false,
      result: newCustomer,
      message: "User Successfully Registered",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const existingCustomer = await CustomerModel.findOne({
      customerEmail: req.body.customerEmail,
    });
    if (!existingCustomer) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }

  
    const validate = await bcrypt.compare(
      req.body.customerPassword,
      existingCustomer.customerPassword
    );
    logger.info(validate);

    if (!validate) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }
    const payload = {
      id: existingCustomer._id,
      role:'customer'
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
          result: existingCustomer,
          token: token,
          message: "User logedin",
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

exports.updateCustomer = async (req, res) => {
  try {
    const existingCustomer = await CustomerModel.findById(req.user._id);
    if (!existingCustomer) {
      return res.send({
        error: true,
        result: {},
        message: "User not found",
      });
    }
    existingCustomer.customerName =
      req.body.customerName || existingCustomer.customerName;
    existingCustomer.customerPhNumber =
      req.body.customerPhNumber || existingCustomer.customerPhNumber;
    existingCustomer.customerGender =
      req.body.customerGender || existingCustomer.customerGender;
    existingCustomer.customerAddress =
      req.body.customerAddress || existingCustomer.customerAddress;
    existingCustomer.updateAt = Date.now();
    existingCustomer.save();
    return res.send({
      error: false,
      result: existingCustomer,
      message: "User successfully updated",
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
    const existingCustomer = await CustomerModel.findById(req.user._id);
    if (!existingCustomer) {
      return res.send({
        error: true,
        result: {},
        message: "User not found",
      });
    }

    const validate = await bcrypt.compare(
      req.body.password,
      existingCustomer.customerPassword
    );
    if (!validate) {
      return res.send({
        error: true,
        message: "Password didn't match",
      });
    }
    console.log("qqwer")
    const salt = await bcrypt.genSalt(10);
    existingCustomer.customerPassword = await bcrypt.hash(
      req.body.newPassword,
      salt
    );
    const updatedUser = await existingCustomer.save();
    return res.send({
      error: false,
      result: updatedUser,
      message: "Password successfully updated",
    });
  } catch (error) {
    logger.info(error);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.forgotPassword = async (req, res) => {

};

exports.getAll = async (req, res) => {
  try {
    const allCustomer = await CustomerModel.find({});
    return res.send({
      error: false,
      result: allCustomer,
      message: "Users successfully found",
    });
  } catch (error) {
    logger.info(error.message);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};
