const express = require("express");
const router = express.Router();
const {
  addSeller,
  loginSeller,
  changePassword,
  forgotPassword,
  getAll,
  updateSeller,
} = require("../controllers/SellerController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/seller/add
@desc - route for seller registration
@access - PUBLIC */
router.post("/seller/add", addSeller);

/**
@type - POST
@route -  /api/seller/logIn
@desc - route for seller login
@access - PUBLIC */
router.post("/seller/logIn", loginSeller);

/**
@type - PUT
@route -  /api/seller/update
@desc - route for seller update account
@access - PRIVATE */
router.put("/seller/update", verifyJWT_MW, updateSeller);

/**
@type - PUT
@route -  /api/seller/changePassword
@desc - route for seller change password
@access - PRIVATE */
router.put("/seller/changePassword", verifyJWT_MW, changePassword);

/**
@type - PUT
@route -  /api/seller/forgotPassword
@desc -  route for seller forgot password
@access - PRIVATE */
router.put("/seller/forgotPassword", forgotPassword);

/**
@type - GET
@route -  /api/seller/all
@desc -  route for get all seller
@access - PRIVATE */
router.get("/seller/all", getAll);

module.exports = router;
/**
 * @swagger
 * /api/seller/add:
 *   post:
 *     summary: Add Seller
 *     description: Api to add a seller.
 *     tags:
 *       - Seller
 *     parameters:
 *       - in: body
 *         name: body
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               sellerEmail :
 *                 type: string
 *               sellerPassword :
 *                 type: string
 *               sellerName:
 *                 type: string
 *               sellerPhNumber:
 *                 type: string
 *               sellerGender:
 *                 type: string
 *               sellerAddress:
 *                 type: string
 *
 *
 *     responses:
 *       201:
 *         description: user Added
 *         schema:
 *           type: object
 *
 * /api/seller/logIn:
 *   post:
 *     summary: LogIn User
 *     description: Api to login a user.
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: body
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               sellerEmail :
 *                 type: string
 *               sellerPassword :
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: User LoggedIn
 *         schema:
 *           type: object
 *
 */
