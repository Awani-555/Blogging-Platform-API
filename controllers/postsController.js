const Post = require('../models/post');

const validatePost = (data) => {
    const {title,content,category,tags} = data;
const errors=[];
//VALIDATE INPUTS

  if (!title || typeof title !== 'string') {
    errors.push("Title is required and must be a string.");
  }

  if (!content || typeof content !== 'string') {
    errors.push("Content is required and must be a string.");
  }

  if (!category || typeof category !== 'string') {
    errors.push("Category is required and must be a string.");
  }

  if (!Array.isArray(tags)) {
    errors.push("Tags must be an array.");
  }
 return errors;
};

//Create post
exports.createPost = async (req, res) => {
  const errors = validatePost(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update post
exports.updatePost = async(req,res) => {
 
 try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) return res.status(404).json({ error: "Post not found." });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all posts
exports.getAllPosts = async(req, res) => {
  try{
    const posts = await Post.find();
  res.json(posts);
}catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get post by ID
exports.getPostById = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found." });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete post
exports.deletePost = async(req, res) => {
   try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post not found." });

    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}