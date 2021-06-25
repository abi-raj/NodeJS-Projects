const fs = require('fs');

module.exports = deleteBook = (title) => {
    const data = fs.readFileSync(__dirname + '/books.json', "utf-8");
    const arrayObj = JSON.parse(data);
    const arr =arrayObj.filter((value) => {
        if (value.title === title) {
           // console.log(title);
            return false;
        }
        else{
            return true;
        }
       
    });
//    arr.forEach((value) =>{
//        console.log(value.title);
//    });

fs.writeFileSync(__dirname + '/books.json',JSON.stringify(arr));

}
// deleteBook("Fairy tales");