
const axios = require('axios');
const url = require('url');
const ListController = (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const page = queryObject.page;
  let queryParam = page ? '?page=' + page : '';
  axios.get('https://reqres.in/api/users' + queryParam)
    .then(response => {
      const users = response.data;
      res.render('index', { users });
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
    res.render('profile', { users });
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('An error occurred');
  });
}
module.exports = {ListController,profileController};