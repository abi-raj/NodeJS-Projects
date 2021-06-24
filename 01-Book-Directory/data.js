const fs = require('fs');

module.exports = bookData = () =>{
    const data = fs.readFileSync('./books.json',"utf-8")

    const book ={
        author: "Virginia Woolf",
        country: "United Kingdom",
        imageLink: "images/mrs-dalloway.jpg",
        language: "English",
        link: "https://en.wikipedia.org/wiki/Mrs_Dalloway\n",
        pages: 216,
        title: "Mrs Dalloway",
        year: 1925
    }
    
const obj = JSON.parse(data);
obj.push(book); 
  fs.writeFileSync('./books.json',JSON.stringify(obj));
  const dataf = fs.readFileSync('./books.json',"utf-8")
   return (JSON.parse(dataf));
   
}
