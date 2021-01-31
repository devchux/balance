const express = require("express");
const debug = require("debug")("app:routes");
const Debit = require("../models/debitModel");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

// @route GET, POST api/debits
// @desc Get debit transactions of the logged in user as well as add new (debit) transaction
// @access Private
router
  .route("/debits")
  .get(verifyToken, async (req, res) => {
    const debits = await Debit.find({ user: req.user._id });
    if (!debits) {
      res.status(500).json({
        error: "A error occured!! There are no debits in the database",
      });
    } else {
      res.status(200).json({ debits });
    }
  })
  .post(verifyToken, (req, res) => {
    const { transaction, amount } = req.body;
    if (!transaction || !amount) {
      res.status(400).json({
        error: "Please provide the transaction or amount",
      });
    }
    if (isNaN(amount)) {
      res.status(400).json({
        error: "Amount is not a number",
      });
    } else {
      const newDebit = new Debit({ user: req.user._id, transaction, amount });
      newDebit.save();
      res.status(200).json({
        debit: newDebit,
      });
    }
  });

// @route PUT, DELETE api/debits/:id
// @desc Update and delete debits transaction
// @access Private
router
  .route("/debits/:id")
  .put(verifyToken, async (req, res) => {
    const { id } = req.params;
    const { transaction, amount } = req.body;
    let debit = await Debit.findById({ _id: id });
    if (debit) {
      // Check if user is authorized
      if (debit.user.toString() !== req.user._id) {
        return res.status(401).json({
          error: "You are not authorized to make this request",
        });
      }
      debit.transaction = transaction ? transaction : debit.transaction;
      if (amount) {
        if (isNaN(amount)) {
          return res.status(400).json({
            error: "Amount is not a number",
          });
        } else {
          debit.amount = amount;
        }
      }
      debit.save();
      res
        .status(200)
        .json({ success: "Debit transaction has been updated successfully." });
    } else {
      res.status(400).json({
        error: `Failed to obtain debit transaction for update operation. Check to see if the correct ID was used.`,
      });
    }
  })
  .delete(verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
      const debit = await Debit.findById({ _id: id });

      // Check if user is authorized
      if (debit.user.toString() !== req.user._id) {
        return res.status(401).json({
          error: "You are not authorized to make this request",
        });
      }
      debit.remove();
      res
        .status(200)
        .json({ success: "Debit transaction has been deleted successfully." });
    } catch (error) {
      res
        .status(400)
        .json({
          error: "Failed to obtain debit transaction for delete operation. Check to see if the correct ID was used."
        });
      debug(error.message);
    }
  });

module.exports = router;
