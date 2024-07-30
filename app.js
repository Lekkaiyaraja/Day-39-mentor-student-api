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
mongoose.connect('mongodb://localhost:27017/mentorStudentDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

module.exports = app;
