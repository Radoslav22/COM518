class LocationDao {
    
    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }

    FindAccommodationByLocation(location) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location = ? `, [location],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
    FindAccommodationByTypeAndLocation(type,location) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE type=? AND location=?`, [type,location],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
    Book1Accommodation(id, date,people) {
        return new Promise ( (resolve, reject) => {
            if (id === '' && date === '' && people === '') {
                res.status(400).json({ error: "You need to specify the details for booking" })
            } else {
            this.conn.query(`INSERT INTO ${this.table} (accID,thedate,npeople) VALUES (?,?,?)`, [id,date,people],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows);
                        
                    }
                });
            }
        });
    }
    Book2Accommodation(id,date,people) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`UPDATE ${this.table} SET availability = availability-? WHERE accID= ? AND thedate=?`, [people,id,date],
                        (err, results, fields) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(results.affectedRows);
                            }
                        });
        });
    }
    CheckDates(id,date) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT accID, thedate, availability FROM ${this.table} WHERE accID=? AND thedate=?`, [id,date],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
   
}
module.exports = LocationDao;