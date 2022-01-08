const bcrypt = require("bcrypt");
const SellerModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/CustomerModel");
var mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const logger = require("pino")();

exports.addProductToCart = async (req, res) => {
  try {
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

    const existingCart = await CartModel.findOne({
      productId: req.params.productId,
      createdBy: req.user._id,
      isEnable:true
    });
    if (existingCart) {
      return res.send({
        error: true,
        message: "Item already available in cart",
      });
    }
    const cart = new CartModel({
      productId: product._id,
      createdBy: req.user._id,
      createdAt: Date.now(),
    });
    const newCart = await cart.save();

    return res.send({
      error: false,
      result: newCart,
      message: "Item added to cart",
    });
  } catch (err) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const existingcart = await CartModel.findByIdAndRemove(req.params.cartId);
    return res.send({
      error: false,
      result: existingcart,
      message: "Item removed from cart",
    });
  } catch (error) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};

exports.getAllCartProduct = async (req, res) => {
  try {
    const allCartItemOfLoggedInUser = await CartModel.find({createdBy:req.user._id});
    return res.send({
      error: false,
      result: allCartItemOfLoggedInUser,
      message: "Cart items found",
    });
  } catch (error) {
    logger.info(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  }
};
