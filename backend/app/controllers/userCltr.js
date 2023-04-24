const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userCltr = {};

// CONTROLLERS

userCltr.create = (req, res) => {
  const body = req.body;
  const user = new User(body);

  user
    .save()
    .then(user => {
      res.json({
        message: "Registered successfully",
        user,
      });
    })
    .catch(err => {
      res.json(err);
    });
};

userCltr.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then(user => {
      if (!user) {
        res.json("invalid email or password");
      } else {
        // check password
        bcrypt.compare(body.password, user.password).then(match => {
          if (match) {
            // generate token
            const tokenData = {
              userId: user._id,
            };
            const secretKey = process.env["JWT_SECRET"];
            const token = jwt.sign(tokenData, secretKey, { expiresIn: "7d" });
            res.json({
              token: `Bearer ${token}`,
            });
          } else {
            res.status(401).json("invalid email or password");
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
userCltr.account = (req, res) => {
  User.findOne({ _id: req.userId })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
};

// MULTER for pic
userCltr.update = (req, res) => {
  if (req.file) {
    const body = req.body;
    body.profilepic = req.file.path;
    User.findOneAndUpdate({ _id: req.userId }, body, {
      new: true,
      runValidator: true,
    })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.json({ errors: "Upload a jpj or png file" });
  }
};

module.exports = userCltr;
