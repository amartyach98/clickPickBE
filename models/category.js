var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = Schema({
  categoryName: {
    type: String
  },
 createdAt: {
    type: String
  },
  updateAt:{
      type:String
  }
});

module.exports = mongoose.model("category", CategorySchema);
