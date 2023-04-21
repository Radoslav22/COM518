const LoginDao = require('../daos/logindao');

class LoginController {
    constructor(db) {
        this.dao = new LoginDao(db, 'acc_users');
    }
    
    async FindLoginDetails(req, res) {
        try {
            const details = await this.dao.FindLoginDetails(req.body.username, req.body.password);
            if (details == null) {
                res.status(401).json({ error: 'No user with this username and password!' });
				
            } else {
                req.session.username = req.body.username;
                res.json({ username: req.body.username });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    Logout(req, res) {
       
            req.session = null;
            res.json({ 'Successfully logout!': 1 });
        
    }

    Login(req, res) {
        
			res.json({username: req.session.username || null} );
        
    }

    
}

module.exports = LoginController;