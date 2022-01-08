var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  isEnable: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
  },
  thumbnail: {
    key: {
      type: String,
    },
    name: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    location: {
      type: String,
      default: null,
    },
  },
  price:{
    type: String
  },
  image: [
    {
      key: {
        type: String,
      },
      name: {
        type: String,
      },
      mimetype: {
        type: String,
      },
      location: {
        type: String,
        default: null,
      },
    },
  ],
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
