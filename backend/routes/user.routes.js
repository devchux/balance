const express = require("express");
const debug = require("debug")("app:userRoutes");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { storeToken } = require("../helpers/signToken");

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
            storeToken(res, jwt, user);
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
    let user = await User.findOne({ email }).select('password');
    if (!user) {
      return res
        .status(404)
        .json({ error: `User not found` });
    }
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return debug("bcrypt error " + err);
      }
      if (!match) {
        return res.status(400).json({ error: `Incorrect password` });
      }

      // Create and store token
      storeToken(res, jwt, user);
    });
  } catch (error) {
    debug(`Login user not found: ${error.message}`);
  }
});

module.exports = router;
