const express = require('express');
const passport = require('passport');
const cors = require('cors');

const route = express.Router();

route.get(
  '/spotify/login',
  cors(),
  passport.authenticate('spotify', {
    scope: ['user-library-read', 'user-top-read']
  })
);

route.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
  console.log('ok');
  res.redirect('http://localhost:3000');
});

module.exports = route;
