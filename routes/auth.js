const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

//Register
router.post('/register',async(req,res) => {
    const { username, password } = req.body;

    //Check if user exists
    const existingUser = await User.findOne({username});
     if (existingUser) return res.status(400).json({ msg: 'User already exists' });

     //Hash Password
     const hashedPassword = await bcrypt.hash(password,10)
      const newUser = new User({ username, password: hashedPassword });
     await newUser.save();

  res.json({ msg: 'User registered successfully' });
});

//Login
router.post('/login',async(req,res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  
  // Create JWT Token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
