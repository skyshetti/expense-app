const express = require("express");
const userCltr = require("../app/controllers/userCltr");
const budgetCltr = require("../app/controllers/budgetCltr");
const categoryCltr = require("../app/controllers/categoryCltr");
const { authenticateUser } = require("../app/middlewares/authentication");
const expenseCltr = require("../app/controllers/expenseCltr");
const upload = require("../app/middlewares/profilePic");
const pdfUpload = require("../app/middlewares/invoiceUpload");
const router = express.Router();

// API's for User model

router.post("/api/users/register", userCltr.create);
router.post("/api/users/login", userCltr.login);
router.get("/api/users/account", authenticateUser, userCltr.account);

// Apis for user budget
router.put("/api/users/budget/:id", authenticateUser, budgetCltr.update);
router.get("/api/users/budget", authenticateUser, budgetCltr.show);

// API's for Category model
router.get("/api/users/category", authenticateUser, categoryCltr.list);
router.post("/api/users/category", authenticateUser, categoryCltr.create);
router.delete(
  "/api/users/category/:id",
  authenticateUser,
  categoryCltr.destroy
);

//
// API's for Expense model
router.post("/api/users/expense", authenticateUser, expenseCltr.create);
router.get("/api/users/expense", authenticateUser, expenseCltr.list);
router.put("/api/users/expense/:id", authenticateUser, expenseCltr.update);
router.delete(
  "/api/users/expense/permanent/:id",
  authenticateUser,
  expenseCltr.permanentDestroy
);

// SOFT DELETE ROUTES
router.delete("/api/users/expense/:id", authenticateUser, expenseCltr.destroy);

router.get(
  "/api/users/expense/res",
  authenticateUser,
  expenseCltr.listSoftDeleted
);

router.put(
  "/api/users/expense/undo/:id",
  authenticateUser,
  expenseCltr.undoSoftDelete
);

// MULTER
router.put(
  "/api/users/register",
  upload.single("avatar"),
  authenticateUser,
  userCltr.update
);

router.put(
  "/api/users/pdf/:id",
  pdfUpload.single("pdf"),
  authenticateUser,
  expenseCltr.updatePdf
);

module.exports = router;
