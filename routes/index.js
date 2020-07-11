const express = require("express");
const router = express.Router();

const Story = require("./../models/Story");
const { ensureAuth, ensureGuest } = require("./../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login"
  });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  const {
    user: { id, firstName }
  } = req;

  try {
    const stories = await Story.find({ user: id }).lean();

    res.render("dashboard", {
      name: firstName,
      stories
    });
  } catch (err) {
    console.log(err);
    res.render("/error/500");
  }
});

module.exports = router;
