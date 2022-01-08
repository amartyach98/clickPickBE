var express = require("express");
const bcrypt = require("bcrypt");
const CategoryModel = require("../models/CategoryModel");
const jwt = require("jsonwebtoken");
const SellerModel = require("../models/SellerModel");
const logger = require("pino")();

exports.addCategory = async (req, res) => {
  try {
    const seller = await SellerModel.findOne({
      _id: req.user._id,
    });
    if (!seller) {
      return res.send({
        error: true,
        return: {},
        message: "Invalid user",
      });
    }
    if (seller.role !== "ADMIN") {
      return res.send({
        error: true,
        return: {},
        message: "You are not authorize for this action",
      });
    } 
      const category = new CategoryModel({
        categoryName: req.body.name,
        createdBy: req.user._id,
      });
      const newCategory = await category.save();
      return res.send({
        error: false,
        result: newCategory,
        message: "Category Successfully Added",
      });
    
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    
    const category = await CategoryModel.findById(req.params.categoryId);
      if (!category) {
        return res.send({
          error: true,
          message: "Invalid category id",
        });
      } else {
        return res.send({
          error: false,
          result: category,
          message: "Category Found",
        });
      }
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({isEnable: true});
    return res.send({
      error: false,
      result: category,
      message: "Category Found",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const seller = await SellerModel.findOne({
      _id: req.user._id,
    });
    if (!seller) {
      return res.send({
        error: true,
        return: {},
        message: "Invalid user",
      });
    }

    if (seller.role !== "ADMIN") {
        return res.send({
          error: true,
          return: {},
          message: "You are not authorize for this action",
        });
      } 

    const existingCategory = await CategoryModel.findById(
      req.params.categoryId
    );
    if (!existingCategory) {
      return res.send({
        error: true,
        return: {},
        message: "Invalid category id",
      });
    }
    existingCategory.isEnable = false;
    const updatedCategory = await existingCategory.save();
    return res.send({
      error: false,
      result: updatedCategory,
      message: "Category Deleted",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};
