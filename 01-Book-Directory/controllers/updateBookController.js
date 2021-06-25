const express = require('express');
const router = express.Router();
const deleteBookJs = require('../utils/deleteBook');
const addBookJs = require('../utils/addBook')

//middleware

const checkBook = (req, res, next) => {
    const book = req.body;
    for (let key in book) {
        if (book[key] === '') {

            res.status(404).json({message:'Fill all the values!'});
        }

    }
    deleteBookJs(book.title); //DELETES the book with the given name
    addBookJs(book);  //ADDS a the same book with new data, if not already present,new one is created
    next();
}
//routes 
router.put('/api/update',checkBook,(req, res) => {
  
    
    res.status(200).json({message:'Book updated!'});
  
  })
  
  module.exports = router;