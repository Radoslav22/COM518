class LoginDao {

    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }


    FindLoginDetails(username, password) {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT ID, username, password FROM ${this.table} WHERE username=? AND password=?`, [username, password],
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length == 0 ? null : results[0]);
                    }

                });
        });
    }
    FindLoginById(userid){
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE ID = ?`, [userid],
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

module.exports = LoginDao;