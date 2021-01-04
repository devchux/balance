const express = require("express");
const debug = require("debug")("app:userRoutes");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middlewares/verifyToken");
const { storeTokenInCookie } = require("../helpers/storeTokenInCookie");

const router = express.Router();

// @route POST api/auth/signup
// @desc Register a user
// @access Public
router.route("/signup").post((req, res) => {
  let { firstname, lastname, email, password, password2 } = req.body;
  if (!firstname || !lastname || !email || !password || !password2) {
    return res.status(400).json({ error: "Complete all fields" });
  } else {
    if (password !== password2) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Confirm the existence of the user
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ error: "A user already exists." });
      }
      // Hash password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return debug("bcrypt error " + err);
        }
        password = hash;

        // Create new user
        User.create({ firstname, lastname, email, password })
          .then((user) => {
            // Create and store token
            storeTokenInCookie(res, user);

            res.status(200).json(user);
          })
          .catch((err) => {
            debug("User registeration failed: " + err);
            return res.status(500).json({ error: "Could not register user" });
          });
      });
    });
  }
});

// @route POST api/auth/signin
// @desc Login user
// @access Public
router.route("/signin").post(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Complete all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: `Could find any user with email: ${email}` });
    }
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return debug("bcrypt error " + err);
      }
      if (!match) {
        return res.status(400).json({ error: `Incorrect password` });
      }

      // Create and store token
      storeTokenInCookie(res, user);

      res.status(200).json(user);
    });
  } catch (error) {
    debug(`Login user not found: ${error.message}`);
    return res
      .status(400)
      .json({ error: `Could find any user with email: ${email}` });
  }
});

router.get("/user", verifyToken, (req, res) => {
  debug(req.user);
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) throw err;
    res.json({ user });
  });
});

router.get("/users", (req, res) => {
  debug(req.user);
  User.find().exec((err, users) => {
    if (err) throw err;
    res.json({ users });
  });
});

module.exports = router;
