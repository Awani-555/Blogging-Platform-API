const express = require('express');
const app=express();

const postsRoutes = require('./routes/posts');

app.use(express.json());

app.get('/status', (req, res) => {
  res.send({ status: 'Running' });
});

app.use('/posts', postsRoutes);

module.exports = app;

