const express = require('express');

const Controller =require('./controllers/HomeController');

const ejs= require('ejs');

const app = express();

const port= process.env.port || 3000;

app.use('/public',express.static('public'));

// app.use(express.static('views'));

app.set('view engine','ejs');

app.get('/',Controller.ListController);

app.get('/profile/:id',Controller.profileController);

app.get('/contact_us',(req,res)=>{
    res.render('contact',{title:'Contact Us'});
    // res.sendFile(__dirname + '/views/contact.ejs',(err)=> {
    //     console.log(err);
    // });
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/create',(req,res)=>{
    res.render(__dirname+'/views/users/create');
});

app.get('/register',(req,res)=>{
    res.render('register');
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