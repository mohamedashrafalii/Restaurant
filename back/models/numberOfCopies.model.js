const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const numberOfCopiesSchema = new Schema(
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

module.exports = NumberOfCopies = mongoose.model("NumberOfCopies", numberOfCopiesSchema);