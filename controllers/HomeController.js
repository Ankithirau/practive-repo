const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const axios = require('axios');
const url = require('url');
const ListController = (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const page = queryObject.page;
  let queryParam = page ? '?page=' + page : '';
  axios.get('https://reqres.in/api/users' + queryParam)
    .then(response => {
      const users = response.data;
      const loggedIn = req.session.loggedIn??null;
      res.render('index', { users:users,loggedIn:loggedIn });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
};

const profileController =(req,res)=>{
  let profileId=req.params.id;
  axios.get('https://reqres.in/api/users/' + profileId)
  .then(response => {
    const users = response.data;
    const loggedIn = req.session.loggedIn??null;

    res.render('profile', { users:users,loggedIn:loggedIn });
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('An error occurred');
  });
}
module.exports = {ListController,profileController};