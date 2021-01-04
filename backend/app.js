const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const creditRouter = require('./routes/credit.routes')
const debitRouter = require('./routes/debit.routes')
const apiRouter = require('./routes/api.routes')
const userRouter = require('./routes/user.routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const PORT = process.env.PORT || 5000;

// Create database connection
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, msg) => {
    if (err) debug(err);
    debug("MongoDB connection was successful...");
  }
);

// Initialize express
const app = express();

// Apply Cors middleware
app.use(cors({
  origin: [
    `http://localhost:3000`
  ],
  credentials: true
}));

// Apply morgan middleware
app.use(morgan("dev"));

// Apply cookie parser middleware
app.use(cookieParser())

// Apply express parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", apiRouter);
app.use("/api", creditRouter);
app.use("/api", debitRouter);
app.use("/api/auth", userRouter);

app.listen(PORT, "127.0.0.1", debug(`App created on port => ${PORT}`));
