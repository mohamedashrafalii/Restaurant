const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//patient schema
const ornekServiceSchema = new Schema(
  {
   patientNumber:{type: Schema.Types.Number, ref: 'Patient'},
   militaryNumber:Number,
   rotba:String,
   type:String,
   patientName:String,
   service:[
    {
      nameAr:String,
      nameEn:String,
      mainService:String,
      price:Number,
      quantity:Number
    }
   ],
   total:Number,
   username:{type: Schema.Types.String, ref: 'User'},
   time:String,
   userId:Number
  },
  {
    timestamps: true
  }
);
autoIncrement.initialize(mongoose.connection);
ornekServiceSchema.plugin(autoIncrement.plugin, 'OrnekService');
module.exports = OrnekService = mongoose.model("OrnekService", ornekServiceSchema);