const express = require('express');
const LoginRouter = express.Router();
const db = require("../utils/mysqlcon")
const LoginController = require("../controllers/logincontroller");
const LController = new LoginController(db);

LoginRouter.post('/login', LController.FindLoginDetails.bind(LController));

LoginRouter.post('/logout', LController.Logout.bind(LController));

LoginRouter.get('/login', LController.Login.bind(LController));


module.exports = LoginRouter;