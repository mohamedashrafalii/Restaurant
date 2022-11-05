const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const patientSchema = new Schema(
  {
   
    name:String,
    
    nationalNumber:String,

    rotba:String,
    
    militaryNumber:String,

    type:{type: Schema.Types.String, ref: 'Category'},

    subPatient:{type: Schema.Types.String, ref: 'Category'},

    subPatientName:String,

    rate:Number,

    ticketPrice:Number,

    neededNumber:Number,

    typeOfType:{type: Schema.Types.String, ref: 'SubPatient'},

    username:{type: Schema.Types.String, ref: 'User'},

    phoneNumber:String,
    userId:String,
    percentageToPay:Number

  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
patientSchema.plugin(autoIncrement.plugin, 'Patient');
module.exports = Patient = mongoose.model("Patient", patientSchema);