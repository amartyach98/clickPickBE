const bcrypt = require("bcrypt");
const SellerModel = require("../models/SellerModel");
const ProductModel = require("../models/ProductModel");
const jwt = require("jsonwebtoken");
const logger = require("pino")();

exports.addProduct = async (req, res) => {
  try {
    const seller = await SellerModel.findById(req.user._id);
    if (!seller) {
      return res.send({
        error: true,
        message: "Invalid user",
      });
    }
    logger.info(seller.role);
    if (seller.role !== "SELLER") {
      return res.send({
        error: true,
        return: {},
        message: "You are not authorize for this action",
      });
    }
    const product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      thumbnail: req.body.thumbnail,
      image: req.body.image,
      categoryId: req.body.categoryId,
      cretedBy: req.user._id,
      createdAt: Date.now(),
    });
    const newProduct = await product.save();
    return res.send({
      error: false,
      result: newProduct,
      message: "Product Added",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.addImage = async (req, res) => {};

exports.deleteImage = async (req, res) => {};

exports.updateProduct = async (req, res) => {
  try {
    const seller = await SellerModel.findById(req.user._id);
    if (!seller) {
      return res.send({
        error: true,
        message: "Invalid user",
      });
    }
    logger.info(seller.role);
    if (seller.role !== "SELLER") {
      return res.send({
        error: true,
        return: {},
        message: "You are not authorize for this action",
      });
    }
    const product = await ProductModel.findOne({
      _id: req.params.productId,
      isEnable: true,
    });
    if (!product) {
      return res.send({
        error: true,
        message: "Product not found",
      });
    }
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.stock = req.body.stock || product.stock;
    product.thumbnail = req.body.thumbnail || product.thumbnail;
    product.image = req.body.image || product.image;
    product.categoryId = req.body.categoryId || product.categoryId;
    product.updateAt = Date.now();

    const editedProduct = await product.save();

    return res.send({
      error: false,
      result: editedProduct,
      message: "Product Updated",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const seller = await SellerModel.findById(req.user._id);
    if (!seller) {
      return res.send({
        error: true,
        message: "Invalid user",
      });
    }
    logger.info(seller.role);
    if (seller.role !== "SELLER") {
      return res.send({
        error: true,
        return: {},
        message: "You are not authorize for this action",
      });
    }
    const product = await ProductModel.findOne({
      _id: req.params.productId,
      isEnable: true,
    });
    if (!product) {
      return res.send({
        error: true,
        message: "Product not found",
      });
    }
    product.isEnable = false;

    const editedProduct = await product.save();

    return res.send({
      error: false,
      result: editedProduct,
      message: "Product Deleted",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};
