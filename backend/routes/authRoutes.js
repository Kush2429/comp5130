const express = require('express');
const router = express.Router();
const Note = require('../models/User');

// Create Note
router.post('/notes', async (req, res) => {
  const { content, expiry } = req.body;
  const newNote = new Note({ content, expiry });
  await newNote.save();
  res.json({ message: 'Note saved successfully' });
});

// Retrieve Note
router.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

module.exports = router;
