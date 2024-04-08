const { Router } = require('express');
const Text = require('../models/blogModels');
const { getBlogs, getBlog, createBlog, deleteBlog, updateBlog,  } = require('../controller/blogController');

const router = Router();

// Get all blogs
router.get('/', getBlogs);

// Get one blog
router.get('/:id', getBlog);

// Create new blog
router.post('/', createBlog)

// Delete blog
router.delete('/:id', deleteBlog);

// Update blog
router.patch('/:id', updateBlog)

module.exports = router;