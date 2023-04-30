const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

//registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, name, age });
      await user.save();
      res.status(200).send({ msg: "Registration has been done" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          res.status(200).send({
            "msg": "login successfully",
            "token": jwt.sign({ "userID": user._id }, "ball"),
          });
        } else {
          res.status(400).send({ msg: "login failed" });
        }
      });
      // // console.log(user);
    }
  } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

userRouter.get("/details", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "ball", (err, decoded) => {
    decoded
      ? res.status(200).send({ msg: "login success" })
      : res.status(400).send({ msg: "login failed" });
  });
});

module.exports = { userRouter };
