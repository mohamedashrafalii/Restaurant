const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const rotbZobatSchema = new Schema(
  {
        type:String
       
  },
  {
    timestamps: true
  }
);

module.exports = RotbZobat = mongoose.model("RotbZobat", rotbZobatSchema);
