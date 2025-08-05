let posts=[];
let postId=1;

const getAllPosts = () => posts;
const getPostById = (id) => posts.find(post => post.id === id);

const createPost = (data) => {
  const now = new Date().toISOString();
  const newPost = {
    id: postId++,
    ...data,
    createdAt: now,
    updatedAt: now
  };
  posts.push(newPost);
  return newPost;
};

const updatePost = (id, data) => {
  const post = getPostById(id);
  if (!post) return null;

  Object.assign(post, data);
  post.updatedAt = new Date().toISOString();
  return post;
};

const deletePost = (id) => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};