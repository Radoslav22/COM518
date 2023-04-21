const express = require('express');
const BookRouter = express.Router();
const db = require("../utils/mysqlcon")
const BookController = require("../controllers/bookcontroller");
const bController = new BookController(db);

BookRouter.post('/book/:id', bController.BookAccommodation.bind(bController));

module.exports = BookRouter;