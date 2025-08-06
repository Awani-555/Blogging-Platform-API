const express = require('express');
const morgan = require('morgan'); 
const app=express();

const postsRoutes = require('./routes/posts');


app.use(morgan('dev')); 

app.use(express.json());

app.get('/status', (req, res) => {
  res.send({ status: 'Running' });
});

app.use('/posts', postsRoutes);

module.exports = app;

