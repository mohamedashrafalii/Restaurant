const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const dftrSchema = new Schema(
  {
    username:String,
    subDepartment:String,
    type:String,
    price:Number


  },
  {
    timestamps: true
  }
);

module.exports = Dftr = mongoose.model("Dftr", dftrSchema);