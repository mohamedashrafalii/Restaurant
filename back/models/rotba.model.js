const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const rotbaSchema = new Schema(
  {
        type:String,
        rotba:String,
        price:Number,
        ticket:{type: Schema.Types.ObjectId, ref: 'Ticket'},
        
  },
  {
    timestamps: true
  }
);

module.exports = Rotba = mongoose.model("Rotba", rotbaSchema);
