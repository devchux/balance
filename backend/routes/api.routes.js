const express = require("express");
const router = express.Router();
const debug = require("debug")("app:api");
const Debit = require("../models/debitModel");
const Credit = require("../models/creditModel");
const User = require("../models/userModel");
const { verifyToken } = require("../middlewares/verifyToken");

// @route GET api
// @desc Get all transactions of the logged in user
// @access Private
router.route('/').get(verifyToken, async (req, res) => {
  const debits = await Debit.find({ user: req.user._id }).select('-user');
  const credits = await Credit.find({ user: req.user._id }).select('-user');
  const user = await User.find({ _id: req.user._id });

  res.status(200).json({
    user,
    transactions: {
      debits,
      credits
    }
  });
});

module.exports = router
