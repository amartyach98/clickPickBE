const express = require("express");
const router = express.Router();
const { addProduct,updateProduct,deleteProduct,addImage,deleteImage, getByCategoryId,getAll } = require("../controllers/ProductController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/product/add
@desc - route for add product
@access - PRIVATE */
router.post("/product/add", verifyJWT_MW, addProduct);

/**
@type - PUT
@route -  /api/product/update
@desc - route for update product
@access - PRIVATE */
router.put("/product/update/:productId", verifyJWT_MW, updateProduct);

/**
@type - DELETE
@route -  /api/product/delete
@desc - route for delete product
@access - PRIVATE */
router.delete("/product/delete/:productId", verifyJWT_MW, deleteProduct);


/**
@type - PUT
@route -  /api/product/addImage
@desc - route for add new image to product
@access - PRIVATE */
router.put("/product/addImage", verifyJWT_MW, addImage);

/**
@type - PUT
@route -  /api/product/deleteImage
@desc - route for delete image from product
@access - PRIVATE */
router.put("/product/deleteImage", verifyJWT_MW, deleteImage);

/**
@type - PUT
@route -  /api/product/all
@desc - route for get all products
@access - PRIVATE */
router.get("/product/all", verifyJWT_MW, getAll);

/**
@type - PUT
@route -  /api/product/:categoryId
@desc - route for get products by categoryId
@access - PRIVATE */
router.get("/product/:categoryId", verifyJWT_MW, getByCategoryId);

module.exports = router;
