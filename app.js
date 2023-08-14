const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
require('./config/database');
const user = require('./Model/user.model');

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
    const existingUser = await user.findOne({
      username: request.body.username,
    });
    if (existingUser) return response.status(400).send('user is already exits');

    const newUser = new user(request.body);
    await newUser.save();
    response.status(201).redirect('/login');
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
