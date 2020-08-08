"use strict";

require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const tableListController = require("./controllers/tableListController");
const tableRowCountController = require("./controllers/tableRowCountController");

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/metadata/tables/sourcedb/:sourcedb/schema/:schema", (req, res) => {
  tableListController.index(req, res);
});

app.get("/metadata/rowcount/sourcedb/:sourcedb/schema/:schema/table/:table", (req, res) => {
  tableRowCountController.index(req, res);
});

app.get("/", function (req, res) {
  res.send("API is Active...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;