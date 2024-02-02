const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes.js");
const openaiRoutes = require("./routes/openaiRoutes.js");
// const errorHandler = require('./middlewares/errorMiddleware.js');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// app.use(errorHandler)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/openai', openaiRoutes)

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hi",
  });
});

app.listen(8080, () => {
  console.log(`Server on port 8080`);
});
