const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const ornekSchema = new Schema(
  {
   patientNumber:{type: Schema.Types.Number, ref: 'Patient'},
   militaryNumber:Number,
   rotba:String,
   type:String,
   patientName:String,
   needed:Number,
   paid:Number,
   priceBeforeDisc:Number,
   remainder:Number,
   ticketPrice:Number,
   rate:Number,
   total:Number,
   username:{type: Schema.Types.String, ref: 'User'},
   time:String,
   userId:Number,
   ornekType:String,
   percentageToPay:Number,
   subPatientName:String
  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
ornekSchema.plugin(autoIncrement.plugin, 'Ornek');
module.exports = Ornek = mongoose.model("Ornek", ornekSchema);