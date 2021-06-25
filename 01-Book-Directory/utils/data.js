const fs = require('fs');

module.exports = bookData = () =>{
    const data = fs.readFileSync(__dirname+'/books.json',"utf-8")

 
 
   return (JSON.parse(data));
   
}
