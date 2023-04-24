const express = require("express");
const cors = require("cors");
const configureDb = require("./config/database");
const router = require("./config/routes");
require("dotenv").config();
const port = 5555;

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
app.use(router);

// Run Server & DB

configureDb();

app.listen(port, () => {
  console.log("server running on port", port);
});
