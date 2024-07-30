const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Mentor = require('../models/mentor');

// Create Student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Assign a student to a mentor
router.post('/:studentId/assign/:mentorId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!student || !mentor) return res.status(404).send('Student or Mentor not found');

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }
    student.mentor = mentor._id;
    await student.save();

    mentor.students.push(student._id);
    await mentor.save();

    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Change mentor for a student
router.post('/:studentId/change-mentor/:mentorId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const newMentor = await Mentor.findById(req.params.mentorId);
    if (!student || !newMentor) return res.status(404).send('Student or Mentor not found');

    const oldMentor = await Mentor.findById(student.mentor);
    if (oldMentor) {
      oldMentor.students.pull(student._id);
      await oldMentor.save();
    }

    student.previousMentors.push(student.mentor);
    student.mentor = newMentor._id;
    await student.save();

    newMentor.students.push(student._id);
    await newMentor.save();

    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get previously assigned mentors for a particular student
router.get('/:studentId/previous-mentors', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    if (!student) return res.status(404).send('Student not found');
    res.send(student.previousMentors);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
