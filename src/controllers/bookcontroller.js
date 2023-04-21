const LocationDao = require('../daos/locationdao');

class BookController {
    constructor(db) {
        this.dao = new LocationDao(db, "acc_bookings");
        this.dao2 = new LocationDao(db, "acc_dates");
    }
    async BookAccommodation(req, res) {
        try {
            const book1 = await this.dao.Book1Accommodation(req.params.id, req.body.thedate, req.body.npeople, );
            if (book1 == null) {
                res.status(404).json({ error: "Wrong parameters for booking" });
            } else {
                const book2 = await this.dao2.Book2Accommodation(req.body.npeople, req.params.id, req.body.thedate);
                if (book2 == null) {
                    res.status(404).json({ error: "Wrong parameters for booking!" });
                    
                } else {
                    res.json({ success: "Successfully booked accommodation!" });
                }
            }
        } catch (e) {
            res.status(500).json({ error: e });
            console.log(e);
        }
    }

}

module.exports = BookController;