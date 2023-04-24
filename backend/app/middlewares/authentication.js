const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  let token = req.header("authorization");
  if (token) {
    token = token.split(" ")[1];

    //   verify token
    try {
      const tokenData = jwt.verify(token, process.env["JWT_SECRET"]);
      req.userId = tokenData.userId;
      next();
    } catch (e) {
      res.status(400).json(e.message);
    }
  } else {
    res.status(401).json({
      errors: "something went wrong",
    });
  }
};

module.exports = {
  authenticateUser,
};
