const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const invTypeSchema = new Schema(
  {
    type:String
  },
  {
    timestamps: true
  }
);

module.exports = InvType = mongoose.model("InvType", invTypeSchema);