const fs = require('fs');

module.exports = addBookToJson = (book)=>{
book.pages = Number(book.pages);
book.year = Number(book.year);

const data = fs.readFileSync(__dirname+'/books.json',"utf-8");
const obj = JSON.parse(data);
obj.push(book); 
fs.writeFileSync(__dirname+'/books.json',JSON.stringify(obj));

}