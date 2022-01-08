const express = require("express");
const router = express.Router();
const {
    addProductToCart,
    deleteCartItem,
    getAllCartProduct
  } = require("../controllers/CartController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/cart/add
@desc - route for add product to cart
@access - PRIVATE */
router.post("/cart/add/:productId", verifyJWT_MW, addProductToCart);

/**
@type - DELETE
@route -  /api/cart/delete
@desc - route for delete product from cart
@access - PRIVATE */
router.delete("/cart/delete/:cartId", verifyJWT_MW, deleteCartItem);

/**
@type - GET
@route -  /api/cart/delete
@desc - route for delete product from cart
@access - PRIVATE */
router.get("/cart/all", verifyJWT_MW, getAllCartProduct);


module.exports = router;
