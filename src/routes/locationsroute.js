const express = require('express');
const LocationRouter = express.Router();
const db = require("../utils/mysqlcon")
const LocationController = require("../controllers/locationcontroller");
const locController = new LocationController(db);

LocationRouter.get('/location/:location', locController.FindAccommodationByLocation.bind(locController));

LocationRouter.get('/type/:type/location/:location', locController.FindAccommodationByTypeAndLocation.bind(locController));

module.exports = LocationRouter;