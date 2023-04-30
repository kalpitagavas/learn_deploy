const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model");
const jwt = require("jsonwebtoken");
noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "ball");
  try {
    if (decoded) {
      const note = await NoteModel.find({ userID: decoded.userID });
      res.status(200).send(note);
    } else {
      res.status(400).send({ msg: "No node has been there" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

noteRouter.post("/add", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new note has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "ball");
  const noteID = req.params.noteId;
  const req_id = decoded.userID;
  const note = await NoteModel.findOne({ _id: noteID });
  const userID_in_note = note.userID;
  const { noteId } = req.params;
  try {
    if (req_id == userID_in_note) {
      const note = await NoteModel.findByIdAndUpdate(noteId, req.body);
      res.status(200).send({ msg: "Note has been Updated" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});




noteRouter.delete("/delete/:noteId", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "ball");
  const noteId = req.params.noteId;
  const req_id = decoded.userID;
  try {
    const note = await NoteModel.findOne({ _id: noteId });
    if (note.userID === req_id) {
      await NoteModel.findByIdAndDelete({ _id: noteId });
      res.status(200).send({ msg: "Note has been Deleted" });
    } else {
      res.status(400).send({ msg: "You are not authorized to delete this note" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

module.exports = { noteRouter };
