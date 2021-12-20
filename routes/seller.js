const express = require("express");
const router = express.Router();
const { addSeller, loginSeller, changePassword, FCMtokenUpdate} = require("../controllers/seller");

//Add user to database
router.post("/seller/add", addSeller);

//User LogIn
router.post("/seller/logIn",loginSeller);


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