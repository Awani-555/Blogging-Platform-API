const PostModel = require('../models/post');

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
exports.createPost = (req, res) => {
  const errors = validatePost(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  

  const newPost = PostModel.createPost(req.body);

  res.status(201).json(newPost);

};

//Update post
exports.updatePost = (req,res) => {
 const id = parseInt(req.params.id);
  const errors = validatePost(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const updated = PostModel.updatePost(id, req.body);
  if (!updated) return res.status(404).json({ error: "Post not found." });

  res.json(updated);
};

//Get all posts
exports.getAllPosts = (req, res) => {
    const posts = PostModel.getAllPosts();
  res.json(posts);
};

//Get post by ID
exports.getPostById = (req, res) => {
  const post = PostModel.getPostById(parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found." });
  res.json(post);
};

//Delete post
exports.deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = PostModel.deletePost(id);
  if (!deleted) return res.status(404).json({ error: "Post not found." });

  res.json({ message: "Post deleted successfully." });
};