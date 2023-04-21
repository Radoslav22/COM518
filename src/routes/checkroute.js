const express = require('express');
const CheckRouter = express.Router();
const db = require("../utils/mysqlcon")
const CheckController = require("../controllers/checkdatecontroller");
const cController = new CheckController(db);

CheckRouter.get('/a/:accID/:thedate', cController.CheckDates.bind(cController));

module.exports = CheckRouter;