const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");           

// express app
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("src/views/index.ejs");
  });