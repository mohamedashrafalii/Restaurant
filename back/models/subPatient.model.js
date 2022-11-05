const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;


//offer schema
const subPatientSchema = new Schema(
  {
        type:
        {
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
subPatientSchema.plugin(autoIncrement.plugin, 'SubPatient');
module.exports = SubPatient = mongoose.model("SubPatient", subPatientSchema);
