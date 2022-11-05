const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const receiptSchema = new Schema(
  {
   patientName:String,

   paid:Number,

   serviceType:{type: Schema.Types.ObjectId, ref: 'MainService'},

   service:[{type: Schema.Types.ObjectId, ref: 'Service'}],

   userName:String,

   total:Number
  },
  {
    timestamps: true
  }
);

module.exports = Receipt = mongoose.model("Receipt", receiptSchema);
