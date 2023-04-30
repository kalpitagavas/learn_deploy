const mongoose = require("mongoose");

//userSchema
const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    age: { type: Number },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
