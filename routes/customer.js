const express = require("express");
const router = express.Router();
const {
  addCustomer,
  loginCustomer,
  changePassword,
  forgotPassword,
  getAll,
  updateCustomer,
} = require("../controllers/CustomerController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/customer/add
@desc - route for seller registration
@access - PUBLIC */
router.post("/customer/add", addCustomer);

/**
@type - POST
@route -  /api/customer/logIn
@desc - route for seller login
@access - PUBLIC */
router.post("/customer/logIn", loginCustomer);

/**
@type - PUT
@route -  /api/customer/update
@desc - route for seller update account
@access - PRIVATE */
router.put("/customer/update", verifyJWT_MW, updateCustomer);

/**
@type - PUT
@route -  /api/customer/changePassword
@desc - route for seller change password
@access - PRIVATE */
router.put("/customer/changePassword", verifyJWT_MW, changePassword);

/**
@type - PUT
@route -  /api/customer/forgotPassword
@desc -  route for seller forgot password
@access - PRIVATE */
router.put("/customer/forgotPassword", forgotPassword);

/**
@type - GET
@route -  /api/customer/all
@desc -  route for get all seller
@access - PRIVATE */
router.get("/customer/all", getAll);

module.exports = router;
