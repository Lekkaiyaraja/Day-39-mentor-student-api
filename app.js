const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mentorsRoutes = require('./routes/mentors');
const studentsRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/mentors', mentorsRoutes);
app.use('/api/students', studentsRoutes);

// MongoDB connection
const mongoUri = 'mongodb+srv://mentor-student-api:G9aHUCVJ0TS0m6zq@cluster0.1wjsvoo.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

module.exports = app;
