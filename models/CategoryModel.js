var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = Schema({
  categoryName: {
    type: String,
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: "sellers",
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

CategorySchema.pre("find", function (next) {
  this.populate("createdBy");
  next();
});

CategorySchema.pre("findOne", function (next) {
  this.populate("createdBy");
  next();
});

module.exports = mongoose.model("categories", CategorySchema);
