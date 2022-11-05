const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const yearSchema = new Schema(
  {
    year:String,
    
  },
  {
    timestamps: true
  }
);

module.exports = Year = mongoose.model("Year", yearSchema);