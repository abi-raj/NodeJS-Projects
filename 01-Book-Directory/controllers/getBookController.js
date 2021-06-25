const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const readBooks = require('../utils/data');

router.get('/api/all', (req, res) => {
    res.status(200).json(readBooks());
});

router.get('/', async (req, res) => {
    const response = await fetch('http://localhost:5000/api/all');
    res.render('home', {
        data:await response.json()
    });
});



module.exports = router;