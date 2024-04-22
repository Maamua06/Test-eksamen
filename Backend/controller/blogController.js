const Blog = require('../models/blogModels');
const mongoose = require('mongoose');

// get all blogs
const getBlogs = async (req, res) => {

  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};

// create new blog
const createBlog = async (req, res) => {
  const { title, body, author } = req.body;
  
  try {
    if(!title || !body || !author){
      throw Error("Please fill in all the fields")
    }
    // add doc to db
    const user_id = req.user._id;
    const blog = await Blog.create({ title, body, author, user_id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};

// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog
};
