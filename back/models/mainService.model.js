const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const mainServiceSchema = new Schema(
  {
    name:String,
    services:[{type: Schema.Types.ObjectId, ref: 'Service'}]

  },
  {
    timestamps: true
  }
);

module.exports = MainService = mongoose.model("MainService", mainServiceSchema);