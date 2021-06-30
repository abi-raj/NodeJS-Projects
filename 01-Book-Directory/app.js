const express = require('express');
const app = express();
const getBookController = require('./controllers/getBookController');
const deleteBookController = require('./controllers/deleteBookController');
const updateBookController = require('./controllers/updateBookController'); 
const addBookController = require('./controllers/addBookController');
//app configs
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static((__dirname, 'public')));
//Route configs
app.use(getBookController);
app.use(addBookController);
app.use(updateBookController); //UI part of this is not yet completed
app.use(deleteBookController);




//final
app.listen(5000, function () {
    console.log('Server started & listening on port 5000');
})


// https://github.com/benoitvallon/100-best-books/blob/master/books.json