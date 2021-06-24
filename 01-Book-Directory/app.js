const express = require('express');
const app =express();  

app.get('/',(req,res) => {
res.send('Hello Book world!');
})


app.listen(5000,function(){
    console.log('Server started & listening on port 5000');
})