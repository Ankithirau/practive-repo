const express = require('express');

const ejs= require('ejs');

const app = express();

const port=process.env.port || 3000;

app.use('/static', express.static('views'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{

    res.render('index',{title:'Home',content:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit expedita quibusdam quasi earum sequi debitis quas. Numquam, libero quas! Dignissimos cumque assumenda tenetur illo recusandae. Assumenda aliquam iure dolore voluptatem!'});
    // res.sendFile(__dirname + '/views/index.html',(err)=> {
    //     console.log(err);
    // });
});

app.get('/contact_us',(req,res)=>{
    res.sendFile(__dirname + '/views/contact.ejs',(err)=> {
        console.log(err);
    });
})

app.listen(port,(req,res)=>{
    console.log(`server is started at port ${ port }`);
});

// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: 'hello world'
//     }))
// });
// server.listen(3000);