
const express = require('express');
const router = express.Router();
const addBookJs = require('../utils/addBook');


//middleware

const checkBook = (req, res, next) => {
    const book = req.body;
    for (let key in book) {
        if (book[key] === '') {

            res.status(404).json({message:'Fill all the values!'});
        }

    }
    addBookJs(book);
    next();
}
//routes
router.post('/api/add',checkBook, (req, res) => {
    res.status(200).json({message: 'book added'});
});

router.get('/add', async (req, res) => {
    res.render('addBook');
});

//have to handle axios in ui


module.exports = router;