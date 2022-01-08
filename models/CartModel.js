var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartSchema = Schema({
  productId: {
    type: Schema.ObjectId,
    ref: "products",
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: "customer",
  },
  isEnable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updateAt: {
    type: String,
  },
});

CartSchema.pre("find", function (next) {
  // this.populate("createdBy");
  this.populate("productId");
  next();
});

CartSchema.pre("findOne", function (next) {
  // this.populate("createdBy");
  this.populate("productId");
  next();
});

module.exports = mongoose.model("carts", CartSchema);
