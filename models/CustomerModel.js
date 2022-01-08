var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = Schema({
  customerEmail: {
    type: String,
  },
  customerName: {
    type: String,
  },
  customerPhNumber: {
    type: String,
  },
  role: {
    type: String,
    default: "customer",
  },

  customerGender: {
    type: String,
  },
  customerPassword: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updateAt: {
    type: String,
  },
});

module.exports = mongoose.model("customer", customerSchema);
