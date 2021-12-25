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

exports.addImage = async (req, res) => {
 
};

exports.deleteImage = async (req, res) => {
 
};

exports.updateProduct = async (req, res) => {
 
};

exports.deleteProduct = async (req, res) => {
 
};