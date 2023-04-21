const { response } = require('express');
const express = require('express');
const locRouter = express.Router();
const db = require("../utils/mysqlcon");


locRouter.get('/location/:location', (req, res) => {
    db.query(
        `SELECT * FROM accommodation WHERE location = ? `,
        [req.params.location],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        }
    );
});

locRouter.get('/type/:type/location/:location', (req, res) => {
    db.query(
        `SELECT * FROM accommodation WHERE type=? AND location=?`,
        [req.params.type, req.params.location],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        }
    );
});

locRouter.post('/book/:id', (req, res) => {
    if (req.params.id === '' && req.body.thedate === '' && req.body.npeople === '') {
        res.status(400).json({ error: "You need to specify the details for booking" })
    } else {
        db.query(
            `INSERT INTO acc_bookings (accID,thedate,npeople) VALUES (?,?,?) `,
            [req.params.id, req.body.thedate, req.body.npeople],
            (error, results, fields) => {
                if (error) {
                    res.status(500).json({ error: error });
                } else {
                    db.query(
                        `UPDATE acc_dates SET availability = availability-? WHERE accID= ? AND thedate=? ; `,  
                        [req.body.npeople, req.params.id, req.body.thedate],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).json({ error: error });
                            } else {
                                res.json({ success: results });
                            }
                        });
                }
            });
    }

});




module.exports = locRouter;