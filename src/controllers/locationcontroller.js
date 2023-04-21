const LocationDao = require('../daos/locationdao'); 

class LocationController {
    constructor(db) {
        this.dao = new LocationDao(db, "accommodation");
    }
    async FindAccommodationByLocation(req, res) {
        try {
            const location = await this.dao.FindAccommodationByLocation(req.params.location);
            if(location == null) {
                res.status(404).json({error: "No accommodation on this location"});
            } else {
                res.json(location);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    async FindAccommodationByTypeAndLocation(req, res) {
        try {
            const typelocation = await this.dao.FindAccommodationByTypeAndLocation(req.params.type, req.params.location);
            if(typelocation == null) {
                res.status(404).json({error: "No accommodation found!"});
            } else {
                res.json(typelocation);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

}

module.exports = LocationController;