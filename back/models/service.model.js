const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const serviceSchema = new Schema(
  {
    nameAr:{
      type: String,
      unique: true,
      required: true
    },
    nameEn:String,
    state:Boolean,
    // subService:String,
    // price:Number
  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
serviceSchema.plugin(autoIncrement.plugin, 'Service');
module.exports = Service = mongoose.model("Service", serviceSchema);