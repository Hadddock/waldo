var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const mongoDB = process.env.CONNECTION_STRING;
// async function main() {
//   console.log(mongoDB);
//   await mongoose.connect(mongoDB);
// }
// main().catch((err) => console.log(err));
var app = express();

var indexRouter = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);

module.exports = app;
