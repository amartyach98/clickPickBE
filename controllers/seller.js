var express = require("express");
const bcrypt = require("bcrypt");
const seller = require("../models/seller");
const jwt = require("jsonwebtoken");
const logger = require('pino')()

/**
@type - POST
@route -  /api/seller/add
@desc - route for add items to cart
@access - PUBLIC */
exports.addSeller = async (req, res) => {
  try {
    const Seller = await seller.findOne({ sellerEmail: req.body.sellerEmail });
    if (Seller) {
      return res.send({
        error: true,
        message: "Seller with this email is already exist",
      });
    }
    const newSeller = new seller(req.body);
    const salt = await bcrypt.genSalt(10);

    if (!newSeller.sellerPassword) {
      return res.send({
        error: true,
        message: "Password can't be blank",
      });
    }

    newSeller.sellerPassword = await bcrypt.hash(req.body.sellerPassword, salt);
    logger.info('newSeller.password--->', newSeller.sellerPassword)
    newSeller.createdAt = Date.now()
    newSeller
      .save()

    return res.send({
      error: false,
      result: newSeller,
      message: "Seller Successfully Registered",
    });
  }
  catch (err) {
    console.log(err);
    return res.send({
      error: true,
      message: "Server Error",
    });
  };

};

/**
@type - POST
@route -  /api/seller/logIn
@desc - route for add items to cart
@access - PUBLIC */
exports.loginSeller = async (req, res) => {
  try {
    const Seller = await seller.findOne({ sellerEmail: req.body.sellerEmail })
    if (!Seller) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }

    logger.info(req.body.sellerEmail)
    logger.info(req.body.sellerPassword)
    logger.info(Seller.sellerPassword)
    const validate = await bcrypt.compare(req.body.sellerPassword, Seller.sellerPassword)
    console.log(validate)

    if (!validate) {
      return res.send({
        error: true,
        message: "Email ID or password invalid",
      });
    }
    const payload = {
      id: Seller._id
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

    )
  }
  catch (err) {
    console.log(`Error while finding user--${err}`);
    return res.send({
      error: true,
      message: "Server Error",
    });
  };
};

/**
@type - POST
@route -  /api/seller/logIn
@desc - route for add items to cart
@access - PRIVATE */
exports.changePassword = async (req, res) => {
  console.log(req.params);
  const Seller=await seller
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found",
        });
      }

      bcrypt
        .compare(req.body.OldPassword.toString(), user.password.toString())
        .then(async (validate) => {
          if (!validate) {
            return res.send({
              error: true,
              message: "Invalid Password",
            });
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.NewPassword, salt);

          user
            .save()
            .then((user) => {
              return res.send({
                error: false,
                result: user,
                message: "Password Changed Sucessfully",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.send({
                error: true,
                message: "Server Error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.send({
            error: true,
            message: "Server Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        error: true,
        message: "Server Error",
      });
    });
};

/**
@type - POST
@route -  /api/seller/logIn
@desc - route for add items to cart
@access - PRIVATE */
exports.forgotPassword = async (req, res) => {
  console.log(req.params);
  const Seller=await seller
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found",
        });
      }

      bcrypt
        .compare(req.body.OldPassword.toString(), user.password.toString())
        .then(async (validate) => {
          if (!validate) {
            return res.send({
              error: true,
              message: "Invalid Password",
            });
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.NewPassword, salt);

          user
            .save()
            .then((user) => {
              return res.send({
                error: false,
                result: user,
                message: "Password Changed Sucessfully",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.send({
                error: true,
                message: "Server Error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.send({
            error: true,
            message: "Server Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        error: true,
        message: "Server Error",
      });
    });
};


/**
@type - POST
@route -  /api/seller/update
@desc - route for add items to cart
@access - PRIVATE */
exports.updateSeller = async (req, res) => {
  console.log(req.params);
  const Seller=await seller
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found",
        });
      }

      bcrypt
        .compare(req.body.OldPassword.toString(), user.password.toString())
        .then(async (validate) => {
          if (!validate) {
            return res.send({
              error: true,
              message: "Invalid Password",
            });
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.NewPassword, salt);

          user
            .save()
            .then((user) => {
              return res.send({
                error: false,
                result: user,
                message: "Password Changed Sucessfully",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.send({
                error: true,
                message: "Server Error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.send({
            error: true,
            message: "Server Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        error: true,
        message: "Server Error",
      });
    });
};

/**
@type - POST
@route -  /api/seller/logIn
@desc - route for add items to cart
@access - PRIVATE */
exports.addProducts = async (req, res) => {
  console.log(req.params);
  const Seller=await seller
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found",
        });
      }

      bcrypt
        .compare(req.body.OldPassword.toString(), user.password.toString())
        .then(async (validate) => {
          if (!validate) {
            return res.send({
              error: true,
              message: "Invalid Password",
            });
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.NewPassword, salt);

          user
            .save()
            .then((user) => {
              return res.send({
                error: false,
                result: user,
                message: "Password Changed Sucessfully",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.send({
                error: true,
                message: "Server Error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.send({
            error: true,
            message: "Server Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        error: true,
        message: "Server Error",
      });
    });
};

