const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const numberOfCopiesOrnekSchema = new Schema(
  {
    numOfCopies:{
      type: Number,
      unique: true,
      required: true
    }

  },
  {
    timestamps: true
  }
);

module.exports = NumberOfCopiesOrnek = mongoose.model("NumberOfCopiesOrnek", numberOfCopiesOrnekSchema);