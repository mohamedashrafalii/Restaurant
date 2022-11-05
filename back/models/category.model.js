const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const categorySchema = new Schema(
  {
    type: {
      type: String,
      unique: true,
      required: true
    }
  
  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, 'Category');
module.exports = Category = mongoose.model("Category", categorySchema);