const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const Budget = require("./budget");
mongoose.set("strictQuery", false);
const Schema = mongoose.Schema;

// regex password checker
const passwordCheck = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// SCHEMA DEFINITION
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
    },
    profilepic: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: function () {
          return "Invalid Email Format";
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      validate: {
        validator: function (value) {
          return passwordCheck.test(value);
        },
        message: function () {
          return "Invalid Password : Passwords must contain at least one uppercase letter, one number, and one special character";
        },
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

// pre save middleware to encrypt user's password b4 saving to DB
userSchema.pre("save", function (next) {
  // bcrypt code for encryption
  bcrypt
    .genSalt()
    .then(salt => {
      bcrypt
        .hash(this.password, salt)
        .then(encrypted => {
          this.password = encrypted;
          next();
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// POST MIDDLEWARE
userSchema.post("save", function (doc, next) {
  const budgetData = {
    userId: doc._id,
  };

  // save budge to DB using create method
  Budget.create(budgetData)
    .then(budget => {
      next(budget);
    })
    .catch(err => {
      next(err);
    });
});

// MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
