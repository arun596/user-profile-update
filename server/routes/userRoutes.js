const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.post('/profile', async (req, res) => {
  try {
    const userData = req.body;

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
