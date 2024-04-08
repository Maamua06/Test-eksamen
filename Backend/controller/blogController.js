const Text = require('../models/blogModels'); 
const mongoose = require('mongoose');

// Get all blogs
const getBlogs = async (req, res) => {
    const blogs = await Text.find({}).sort({createdAt: -1});

    res.status(200).json(blogs);
}

// Get One blog
const getBlog = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Id is not valid'})
    }

    const blog = await Text.findById(id);

    if (!Text) {
        return res.status(404).json({ error: 'No blogs with this id'})
    }

    res.status(200).json(blog);
}

// Create new blog
const createBlog = async (req, res) => {
    const {title, author, body} = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!author) {
        emptyFields.push('author')
    }
    if(!body) {
        emptyFields.push('body')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in empty fields', emptyFields})
    }

    // Add document to db
    try{
        const text = await Text.create({ title, author, body})
        res.status(200).json(text)
    } catch (error) {
        res.status(400).json( { error: error.message })
    }
}

// Delete blog
const deleteBlog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Id is not valid'})
    }

    const text = await Text.findByIdAndDelete({_id: id})

    if (!Text) {
        return res.status(400).json({ error: 'No blogs with this id'})
    }

    res.status(200).json(text)
}


// Update blog
const updateBlog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Id is not valid'})
    }

    const text = await Text.findByIdAndUpdate({_id:id}, {...req.body})

    if (!Text) {
        return res.status(400).json({ error: 'No blogs with this id'})
    }

    res.status(200).json(text)
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}