const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const ticketSchema = new Schema(
  {
        type:String,
        price:Number,
  },
  {
    timestamps: true
  }
);

module.exports = Ticket = mongoose.model("Ticket", ticketSchema);
