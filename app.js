const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.status(200).render('index');
});

app.get('/register', (request, response) => {
  try {
    response.status(200).render('register');
  } catch (error) {
    response.status(404).json({ message: 'file not found' });
  }
});

// app.post('/register', (request, response) => {});

app.get('/login', (request, response) => {
  try {
    response.status(200).render('login');
  } catch (error) {
    response.status(404).json({ message: 'file not found' });
  }
});

app.get('/profile', (request, response) => {
  try {
    response.status(200).render('profile');
  } catch (error) {
    response.status(404).json({ message: 'file not found' });
  }
});

app.get('/logout', (request, response) => {
  try {
    response.status(200).render('logout');
  } catch (error) {
    response.status(404).json({ message: 'file not found' });
  }
});
// app.post('/login', (request, response) => {});

app.get('/profile', (request, response) => {});

module.exports = app;
