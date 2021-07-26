const jwt = require('jsonwebtoken');
const User = require('../models/User')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'the seven wonder project secret', (err, data) => {
            if (err) {
                res.redirect('/login');
            } else {

                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
    jwt.verify(token, 'the seven wonder project secret', async (err, data) => {
        if (err) {
            res.locals.user = null;

            next();
        } else {
            let user = await User.findById(data.id);
            res.locals.user = user;
            next();
        }
    });
}
else{
    res.locals.user = null;

    next();
}
}
module.exports = {
    requireAuth,checkUser
};