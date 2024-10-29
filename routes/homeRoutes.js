const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const user = req.user;
  console.log("user =", user);
  res.render("home", { user });
});

module.exports = router;
