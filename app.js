const express = require('express');
const morgan = require('morgan'); 
const app=express();

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use(morgan('dev')); 
app.use(express.json());


app.get('/status', (req, res) => {
  res.send({ status: 'Running' });
});

app.use('/posts', postsRoutes);
app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is protected data', user: req.user });
});


module.exports = app;

