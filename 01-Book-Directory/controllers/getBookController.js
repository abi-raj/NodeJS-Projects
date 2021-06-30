const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const readBooks = require('../utils/data');
const singleBook = require('../utils/getSingleBook')

router.get('/api/all', (req, res) => {
    res.status(200).json(readBooks());
});
router.get('/api/get/:title', (req, res) => {
    const title = req.params.title;
    res.status(200).json(singleBook(title));
});
router.get('/', async (req, res) => { //all the books
    const response = await fetch('http://localhost:5000/api/all');
    res.render('home', {
        data: await response.json()
    });
});



module.exports = router;