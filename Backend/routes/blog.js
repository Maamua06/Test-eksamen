const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog
} = require('../controller/blogController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all blogs
router.get('/', getBlogs);

// require auth for all blog routes
router.use(requireAuth);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/', createBlog);

// DELETE a blog
router.delete('/:id', deleteBlog);

// UPDATE a blog
router.patch('/:id', updateBlog);

module.exports = router;
