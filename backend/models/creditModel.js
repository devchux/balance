const { Schema, model } = require("mongoose");

const creditSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  transaction: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Credit", creditSchema);
