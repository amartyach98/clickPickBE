var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sellerSchema = Schema({
  sellerEmail: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  sellerPhNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "SELLER"],
    default: "SELLER",
  },
  sellerGender: {
    type: String,
  },
  sellerAddress: {
    type: String,
  },
  sellerPassword: {
    type: String,
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

module.exports = mongoose.model("sellers", sellerSchema);
