const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const subServiceSchema = new Schema(
  {
    nameAr:{
      type: String,
      unique: true,
      required: true
    },
    nameEn:String,
    mainService:String,
    price:Number,
    quantity:Number,
    state:Boolean
  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
subServiceSchema.plugin(autoIncrement.plugin, 'SubService');
module.exports = SubService = mongoose.model("SubService", subServiceSchema);