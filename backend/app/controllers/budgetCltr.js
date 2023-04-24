const Budget = require("../models/budget");

const budgetCltr = {};

budgetCltr.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Budget.findOneAndUpdate({ _id: id, userId: req.userId }, body, {
    new: true,
    runValidators: true,
  })
    .then(updated => {
      res.json(updated);
    })
    .catch(err => {
      res.json(err);
    });
};

budgetCltr.show = (req, res) => {
  Budget.findOne({ userId: req.userId })
    .then(userBudget => {
      res.json(userBudget);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports = budgetCltr;
