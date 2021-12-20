var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = Schema({
  customerEmail: {
    type: String
  },
  customerName: {
    type: String
  },
  customerPhNumber: {
    type: String
  },
  customerGender:{
      type:String
  },
 customerAddress:{
     type:String
 },
 createdAt: {
    type: String
  },
  updateAt:{
      type:String
  }
});

module.exports = mongoose.model("customer", customerSchema);
