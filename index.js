const express = require("express");
const { connection } = require("./config/db");
const { noteRouter } = require("./routes/notes.routes");
const cors  = require("cors");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config()
const { userRouter } = require("./routes/user.routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`server is running at ${process.env.port}`);
});
