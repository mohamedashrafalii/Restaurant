const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const departmentSchema = new Schema(
  {
    type:{
      type: String,
      unique: true,
      required: true
    }

  },
  {
    timestamps: true
  }
);

module.exports = Department = mongoose.model("Department", departmentSchema);