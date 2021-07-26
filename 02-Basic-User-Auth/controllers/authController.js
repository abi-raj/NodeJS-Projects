//import user model 
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const handleError = (err) => {
    let error = {
        email: '',
        password: ''
    };

    if(err.message === 'incorrect email'){
    error.email = 'User email is not found';
    }
    if(err.message === 'incorrect password'){
        error.password = 'incorrect password';
    }

    if (err.code === 11000) {
        error.email = 'Email already exists';
        return error;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            console.log(properties.message);
            error[properties.path] = properties.message;
        })
    }
    return error;
}
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({
        id
    }, 'the seven wonder project secret', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.create({
            email: email,
            password: password

        });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(201).json({
            user: user._id
        });
    } catch (e) {
        //console.log(e);
        res.status(400).json(handleError(e));
    }
}

module.exports.login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(200).json({
            user: user._id
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(handleError(err));
    }
}

module.exports.logout_get = (req, res) => {
res.cookie('jwt', '', {maxAge:1});
res.redirect('/');
}