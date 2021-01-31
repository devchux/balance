const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const debug = require("debug")("app:routes");
const Credit = require("../models/creditModel");

const router = express.Router();

// @route GET, POST api/credits
// @desc Get credit transactions of the logged in user as well as add new (credit) transaction
// @access Private
router
  .route("/credits")
  .get(verifyToken, async (req, res) => {
    const credits = await Credit.find({ user: req.user._id });
    if (!credits) {
      res.status(500).json({
        error: "A error occured!! There are no credits in the database",
      });
    } else {
      res.status(200).json({ credits });
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
      const newCredit = new Credit({ user: req.user._id, transaction, amount });
      newCredit.save();
      res.status(200).json({
        credit: newCredit,
      });
    }
  });

// @route PUT, DELETE api/credits/:id
// @desc Update and delete credits transaction
// @access Private
router
  .route("/credits/:id")
  .put(verifyToken, async (req, res) => {
    const { id } = req.params;
    const { transaction, amount } = req.body;
    let credit = await Credit.findById({ _id: id });
    if (credit) {
      // Check if user is authorized
      if (credit.user.toString() !== req.user._id) {
        return res.status(401).json({
          error: "You are not authorized to make this request",
        });
      }
      credit.transaction = transaction ? transaction : credit.transaction;
      if (amount) {
        if (isNaN(amount)) {
          res.status(400).json({
            error: "Amount is not a number",
          });
        } else {
          credit.amount = amount;
        }
      }
      credit.save();
      res
        .status(200)
        .json({ success: "Credit transaction has been updated successfully." });
    } else {
      res.status(400).json({
        error: `Failed to obtain credit transaction for update operation. Check to see if the correct ID was used.`,
      });
    }
  })
  .delete(verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
      const credit = await Credit.findById({ _id: id });
      if (credit) {
        // Check if user is authorized
        if (credit.user.toString() !== req.user._id) {
          return res.status(401).json({
            error: "You are not authorized to make this request",
          });
        }
        credit.remove();
        return res
        .status(200)
        .json({ success: "Credit transaction has been deleted successfully." });
      }
      res
        .status(404)
        .json({ error: "Credit transaction does not exist" });
    } catch (error) {
      res.status(400).json({
        error:
          "Failed to obtain credit transaction for delete operation. Check to see if the correct ID was used.",
      });
      debug(error.message);
    }
  });

module.exports = router;
