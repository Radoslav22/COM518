const express = require('express');
const testRouter = express.Router();
const db = require("../utils/mysqlcon");


testRouter.get('/hometown/:type', (req, res) => {
    db.query(
        `SELECT * FROM accommodation WHERE type = ? `,
        [req.params.type],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        }
    );
});

testRouter.get('/a/:accID/:thedate', (req,res) => {
    db.query(
        `SELECT accID, thedate, availability FROM acc_dates WHERE accID=? AND thedate=?`,
        [req.params.accID, req.params.thedate],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        }
    );
});

module.exports = testRouter;