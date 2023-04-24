const Category = require("../models/category");
const Expense = require("../models/expense");
const categoryCltr = {};

//controllers

categoryCltr.list = (req, res) => {
  Category.find({ userId: req.userId })
    .then(userCategories => {
      res.json(userCategories);
    })
    .catch(err => {
      res.json(err);
    });
};

categoryCltr.create = (req, res) => {
  const body = req.body;
  const category = new Category(body);
  category.userId = req.userId;
  category
    .save()
    .then(createdCategory => {
      res.json(createdCategory);
    })
    .catch(err => {
      res.json(err);
    });
};

categoryCltr.destroy = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete({ _id: id, userId: req.userId })
    .then(data => {
      // res.json(data);
      Expense.deleteMany({ categoryId: data._id, userId: req.userId })
        .then(() => {
          res.json(data);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = categoryCltr;
