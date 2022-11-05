const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const ratesSchema = new Schema(
  {
    price:{
      type: Number,
      unique: true,
      required: true
    }

  },
  {
    timestamps: true
  }
);

module.exports = Rates = mongoose.model("Rates", ratesSchema);