const express = require("express");
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategory,
} = require("../controllers/CategoryController");
const { verifyJWT_MW } = require("../middlewares/jwtVerifier");

/**
@type - POST
@route -  /api/category/add
@desc - route for add category
@access - PRIVATE */
router.post("/category/add", verifyJWT_MW, addCategory);

/**
@type - GET
@route -  /api/category/getBycategoryId
@desc - route for get category by id
@access - PRIVATE */
router.get("/category/getBycategoryId/:categoryId", verifyJWT_MW, getCategoryById);

/**
@type - GET
@route -  /api/category/all
@desc - route for get all category 
@access - PRIVATE */
router.get("/category/all", getAllCategory);

/**
@type - DELETE
@route -  /api/category/delete
@desc - route for delete category
@access - PRIVATE */
router.delete("/category/delete/:categoryId", verifyJWT_MW, deleteCategory);

module.exports = router;
