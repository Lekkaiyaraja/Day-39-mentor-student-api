const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create Mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) return res.status(404).send('Mentor not found');
    res.send(mentor.students);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
