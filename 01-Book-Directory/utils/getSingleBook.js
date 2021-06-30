const fs = require('fs');
module.exports =getSingle = (title) =>{
    const data = fs.readFileSync(__dirname + '/books.json', "utf-8");
    const arrayObj = JSON.parse(data);
    const book = arrayObj.find(element => element.title === title);
    return book;
}