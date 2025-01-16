const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// view engine
app.set("view engine", "ejs");

app.listen(3000)

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/playertransfer", (req, res) => {
  res.render("playertransfer");
});

app.get("/banktransfer", (req, res) => {
  res.render("banktransfer");
});
