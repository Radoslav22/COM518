const LocationDao = require('../daos/locationdao'); 

class CheckController {
    constructor(db) {
        this.dao = new LocationDao(db, "acc_dates");
    }
    async CheckDates(req, res) {
        try {
            const check = await this.dao.CheckDates(req.params.accID, req.params.thedate);
            if(check == null) {
                res.status(404).json({error: "Wrong date and/or id"});
            } else {
                res.json(check);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

}

module.exports = CheckController;