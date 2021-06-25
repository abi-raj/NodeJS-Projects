const express = require('express');
const router = express.Router();
const deleteBookJs = require('../utils/deleteBook');

//routes 
router.delete('/api/delete/:title',(req, res) => {
    const bookTitle = req.params.title;
    deleteBookJs(bookTitle);
    res.status(200).json({message:'Book deleted!'});
})

module.exports = router;