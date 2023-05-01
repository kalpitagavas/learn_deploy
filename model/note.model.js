const mongoose = require("mongoose");

//userSchema
const noteSchema = mongoose.Schema(
  {
    title: { type: String },
    img:{type:String},
    body: { type: String },
    sub: { type: String },
    userID: { type: String },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);
module.exports = { NoteModel };
