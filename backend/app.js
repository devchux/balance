const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const creditRouter = require('./routes/credit.routes')
const debitRouter = require('./routes/debit.routes')
const userRouter = require('./routes/user.routes')

dotenv.config();


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
    'http://localhost:3000'
  ]
}));

// Apply morgan middleware
app.use(morgan("dev"));

// Apply express parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply cookie parser middleware
app.use(cookieParser())

// Routes
app.use("/api", creditRouter);
app.use("/api", debitRouter);
app.use("/api/auth", userRouter);

app.get('/', (req, res) => {
  console.log(req.cookies.jwt)
  res.send('testing...')
})

app.listen(process.env.PORT || 5000, "127.0.0.1", debug(`App created on port => ${process.env.PORT || 5000}`));
