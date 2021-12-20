var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sellerSchema = Schema({
  sellerEmail: {
    type: String
  },
  sellerName: {
    type: String
  },
  sellerPhNumber: {
    type: String
  },
  sellerGender:{
      type:String
  },
 sellerAddress:{
     type:String
 },
 sellerPassword:{
     type:String
 },
 createdAt: {
    type: String
  },
  updateAt:{
      type:String
  }
});

module.exports = mongoose.model("seller", sellerSchema);
