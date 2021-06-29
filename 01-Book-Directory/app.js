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
app.use(updateBookController);
app.use(deleteBookController);




//IGNORE
//app routes
// app.get('/', (req, res) => {

//     res.render('home', {
//         data: bookD(),
//     });
// })
// app.get('/add', (req, res) => {
//     res.render('addBook', {
//         errors: undefined
//     });
// })
// app.post('/add', checkBook, (req, res) => {
//     // console.log(req.body);

//     res.redirect('/');
// });
// app.delete('/delete/:title',(req, res) => {
//     const bookTitle = req.params.title;
//     deleteBookJs(bookTitle);
//     res.redirect('/');

// })

// app.put('/update', (req, res) => {
//   const book = req.body;
//   deleteBookJs(book.title);
//   addBookJs(book);
//   res.redirect('/');
// //   res.json({status:true});
// })





//final
app.listen(5000, function () {
    console.log('Server started & listening on port 5000');
})


// https://github.com/benoitvallon/100-best-books/blob/master/books.json