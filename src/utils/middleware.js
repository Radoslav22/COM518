
const LoginDao = require('../daos/logindao');


async function LoginMiddleware(req, res, next) {
        
        try {
			//const dao  = new LoginDao(db, 'acc_users');
            //const logincheck = await dao.LoginMiddleware();
            if (['POST', 'DELETE'].indexOf(req.method) == -1) {
                next();
            } else {
                if (req.user) {
                    next();
                } else {
                    res.status(401).json({ error: "You're not logged in. Go away!" });
                }
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
}

module.exports = LoginMiddleware;

