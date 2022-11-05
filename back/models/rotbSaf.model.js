const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const rotbSafSchema = new Schema(
  {
        type:String
       
  },
  {
    timestamps: true
  }
);

module.exports = RotbSaf = mongoose.model("RotbSaf", rotbSafSchema);
