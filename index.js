// const http = require('http');

const express = require('express');

const app = express();

app.use('/static', express.static('views'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html',(err)=> {
        console.log(err);
    });
})

app.listen(3000,(req,res)=>{
    console.log(`server is started at port ${ 3000 }`);
})




// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: 'hello world'
//     }))
// });


// server.listen(3000);


