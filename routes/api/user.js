const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../model/user");
const router = express.Router();

router.post(
  "/insert",
  [
    check("userName", "KHONG RONG").not().isEmpty(),
    check("password", "PASS 8 ky tu").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, password } = req.body; //const username = req.body.userName
    try {
      user = new User({
        userName,
        password,
      });
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
router.get("/search/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
