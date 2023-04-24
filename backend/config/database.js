const mongoose = require("mongoose");

const configureDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/project-expense-app")
    .then(() => {
      console.log("DB Connected");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = configureDb;
