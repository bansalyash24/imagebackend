const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    image: {
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views:{
        type:Array,
        default:[]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("images", userSchema);