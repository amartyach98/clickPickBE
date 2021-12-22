var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
  },
  categoryId: [
    {
      type: Schema.ObjectId,
      ref: "categories",
    },
  ],
  cretedBy: {
    type: Schema.ObjectId,
    ref: "sellers",
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updateAt: {
    type: String,
  },
});

module.exports = mongoose.model("products", productSchema);
