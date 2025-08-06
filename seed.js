require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');
const Post = require('./models/post');

const mongoURI = process.env.MONGO_URI;

const samplePosts = [
  {
    title: 'Node.js Basics',
    content: 'Learn the basics of Node.js in this post.',
    category: 'Programming',
    tags: ['Node.js', 'JavaScript', 'Backend'],
  },
  {
    title: 'Express Routing',
    content: 'How to set up routes in Express.js.',
    category: 'Web Development',
    tags: ['Express', 'Node.js', 'Routing'],
  },
  {
    title: 'MongoDB Integration',
    content: 'Connecting your Node.js app with MongoDB using Mongoose.',
    category: 'Database',
    tags: ['MongoDB', 'Mongoose', 'Node.js'],
  },
];

async function seedDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log(' Cleared existing posts');

    // Insert sample posts
    await Post.insertMany(samplePosts);
    console.log('Sample posts inserted');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error(' Error:', err);
  }
}

seedDB();