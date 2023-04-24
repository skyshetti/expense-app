const Expense = require("../models/expense");

const expenseCltr = {};

// controllers
expenseCltr.create = (req, res) => {
  const body = req.body;
  console.log(body);
  const expense = new Expense(body);
  expense.userId = req.userId;
  expense
    .save()
    .then(expense => {
      res.json(expense);
    })
    .catch(err => {
      res.json(err);
    });
};

expenseCltr.list = (req, res) => {
  Expense.find({ userId: req.userId })
    .then(expenses => {
      res.json(expenses);
    })
    .catch(err => {
      res.json(err);
    });
};

expenseCltr.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Expense.findOneAndUpdate({ _id: id, userId: req.userId }, body, {
    new: true,
    runValidators: true,
  })
    .then(expense => {
      res.json(expense);
    })
    .catch(err => {
      res.json(err);
    });
};

expenseCltr.permanentDestroy = (req, res) => {
  const id = req.params.id;
  Expense.findByIdAndDelete({ _id: id, userId: req.userId })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
};

// SOFT DELETE

expenseCltr.destroy = (req, res) => {
  const id = req.params.id;

  Expense.deleteById({ _id: id, userId: req.userId })
    .then(softDelete => {
      res.json(softDelete);
    })
    .catch(err => {
      res.json(err);
    });
};

expenseCltr.listSoftDeleted = (req, res) => {
  Expense.findDeleted({ userId: req.userId })
    .then(restore => {
      res.json(restore);
    })
    .catch(err => {
      res.json(err);
    });
};

expenseCltr.undoSoftDelete = (req, res) => {
  const id = req.params.id;
  Expense.findOneAndUpdateDeleted(
    { _id: id, userId: req.userId },
    { deleted: "false" },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(expense => {
      res.json(expense);
    })
    .catch(err => {
      res.json(err);
    });
};

// MULTER PDF
expenseCltr.updatePdf = (req, res) => {
  if (req.file) {
    const id = req.params.id;
    const body = req.body;
    body.invoicePdf = req.file.path;
    Expense.findOneAndUpdate({ _id: id, userId: req.userId }, body, {
      new: true,
      runValidator: true,
    })
      .then(expense => {
        res.json(expense);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.json({ errors: "Only pdf can be uploaded" });
  }
};

module.exports = expenseCltr;
