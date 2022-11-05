const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//offer schema
const userSchema = new Schema(
  {
    
    name:type=String,
    
    username:{
      type: String,
      unique: true,
      required: true
    },
    phoneNumber:String,
    nationalId:String,
salary:Number,
    password:type=String,
    
    type:type=String,
    
    state:{type:Boolean,default:true},
    
    department:{type: Schema.Types.String, ref: 'Department'}
,subDepartment:String
  },
  {
    timestamps: true
  }
);
userSchema.index({
  "$**": "text"
});
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'User');

module.exports = User = mongoose.model("User", userSchema);