const express = require('express');
const app = express();
const keys = require('./auth-config');
const path = require('path');
const bodyparser = require('body-parser');
const auth = require('./routes/login');
const cors = require('cors');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session');

app.use(express.static('public'));
app.use(bodyparser.json());

// console.log('hello', passport.user);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['user']
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
// app.use(cors);

app.listen(3000, () => {
  console.log('app running on port: 3000');
});

app.get('/*', cors(), (req, res) => {
  console.log('user', req.user);
  res.sendFile(path.resolve('public/index.html'));
});
