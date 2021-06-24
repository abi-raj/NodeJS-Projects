const express = require('express');
const app = express();
const bookD = require('./data.js')


app.set('view engine', 'ejs');
app.get('/', (req, res) => {

    
    res.render('home', {
        data: bookD(),
    });
})


app.listen(5000, function () {
    console.log('Server started & listening on port 5000');
})


// https://github.com/benoitvallon/100-best-books/blob/master/books.json