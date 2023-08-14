const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
require('./config/database');
const user = require('./Model/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.status(200).render('index');
});

// --------------------------------------------------

app.get('/register', (request, response) => {
  response.status(200).render('register');
});

app.post('/register', async (request, response) => {
  try {
    const { username: usernameBody, password: passwordBody } = request.body;

    const existingUser = await user.findOne({
      username: usernameBody,
    });
    if (existingUser) return response.status(400).send('user is already exits');

    bcrypt.hash(passwordBody, saltRounds, async (error, hash) => {
      const newUser = new user({
        username: usernameBody,
        password: hash,
      });

      await newUser.save();
      response.status(201).redirect('/login');
    });
  } catch (error) {
    response.status(500).send('post not found');
  }
});

// --------------------------------------------------

app.get('/login', (request, response) => {
  response.status(200).render('login');
});

app.get('/profile', (request, response) => {
  response.status(200).render('profile');
});

app.get('/logout', (request, response) => {
  response.render('index');
});

module.exports = app;
