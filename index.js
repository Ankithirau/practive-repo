const express = require('express');

const session = require('express-session');

const axios = require('axios');

const Controller = require('./controllers/HomeController');

const Joi = require('joi');

const app = express();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const port = process.env.port || 3000;

    // enable body parsing middleware
    app.use(express.urlencoded({ extended: true }));

    app.use('/public', express.static('public'));

    app.set('view engine', 'ejs');

    // app.use(express.static('views'));

    //Basic Routing

    app.get('/', Controller.ListController);

    app.get('/profile/:id', Controller.profileController);

    app.get('/contact_us', (req, res) => {
        res.render('contact', { title: 'Contact Us' });
        // res.sendFile(__dirname + '/views/contact.ejs',(err)=> {
        //     console.log(err);
        // });
    })

    app.get('/dashboard', (req, res) => {
        if (req.session.loggedIn) {
            res.render('dashboard');
        }else{
            res.redirect('/login');
        }
        
    });

    app.get('/login', (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('dashboard');
        }else{
            res.render('login');
        }
    });

    app.post('/user-login', async (req,res)=>{
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.render('login', { formData: req.body, errors: errors });
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://reqres.in/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: req.body.email,
                password: req.body.password
            })
        };

        let msg;
        let status;
        await axios.request(config).then(function (response) {
            req.session.loggedIn = true;
            status =200;
            // console.log(response);
        }).catch(function (err) {
            console.log(err);
            status =400;
            msg = `something went wrong`;
        });
            
        return status==200 ? res.redirect('/dashboard'):res.render('login', { status: status,msg:msg })
    });

    app.get('/create', (req, res) => {
        res.render(__dirname + '/views/users/create');
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.post('/register-user', async (req, res) => {

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.render('register', { formData: req.body, errors: errors });
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://reqres.in/api/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email: req.body.email,
                password: req.body.password
            })
        };
        let msg;
        let status;
        await axios.request(config).then(function (response) {
            status =200;
            msg = `user registered successfully and your token is ${response.data.token}`;
        }).catch(function (err) {
            status =400;
            msg = `something went wrong`;
        });

        return res.render('register', { status: status,msg:msg });
    });

    app.listen(port, (req, res) => {
        console.log(`server is started at port ${port}`);
    });

    // const http = require('http');
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({
    //         data: 'hello world'
    //     }))
    // });

    // server.listen(3000);